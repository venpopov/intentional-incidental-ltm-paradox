# Produce long-format data file

library("jsonlite")
library("tidyverse")

rm(list=ls())
graphics.off()

# currentDir <- dirname(rstudioapi::getSourceEditorContext()$path)
# setwd(currentDir)  # sets the directory of location of this script as the current directory


# Read JATOS Data

file_name <- "data/oberauer_werner_2021/Incidental_WM_LTM7_JATOS.txt"

din <- scan(file = file_name, what = "character", sep = "\n")
din1 <- din[1]
split1 <- strsplit(din1, split=c("clicks"))

dat <- map(din, ~fromJSON(.)[,-c(1:2)])
for (j in seq_along(dat)) {
  colnames(dat[[j]]) <- make.names(colnames(dat[[j]]), unique = TRUE)
  dat[[j]]$id <- fromJSON(din[[j]])$url$srid[1]
}
dat <- bind_rows(dat) %>% 
  as_tibble() 
dat <- as.data.frame(dat)


# assign IDs

# dat$ID <- -1
# idx <- 0
# for (line in 1:dim(dat)[1]) {
#   if (!is.na(dat$experimental_condition[line])) idx <- idx + 1
#   dat$ID[line] <- idx
# }

dat$ID <- as.numeric(dat$id)

## Define helper functions

InputPosition <- function(recalledword, candidates, distTolerance) {
  if (!is.na(recalledword)) {
    extralist <- 0
    omission <- 0
    distance <- adist(recalledword, candidates, ignore.case=T)  # Levenshtein distance
    inpos <- which(distance==min(distance))
    if (min(distance[inpos]) > distTolerance) extralist <- 1   # extralist intrusion
    if (length(inpos)>1 & (min(distance[inpos]) > 0)) extralist <- 1  # if there are 2 equally good matches, and both are not perfect
    if (recalledword=="" | recalledword==" ") omission <- 1
    if (extralist==1) inpos <- length(candidates)+1
    if (omission==1) inpos <- length(candidates)+2
  } else inpos <- NA
  return(inpos[1])
}


## parse each subject

Data <- as.data.frame(matrix(NA,100*max(dat$ID),16))
names(Data) <- c("ID", "age", "gender", "consent", "expectedMemory", 
                 "memoryCond", "instructionCond", "listlength", "deltaLength", "numEnd",
                 "ListRecency", "Position", "WordPresented", "WordRecalled", "Inpos", "Box")
Data$ID <- 0
SizeData <- as.data.frame(matrix(NA,7*max(dat$ID),11))
names(SizeData) <- c("ID", "memoryCond", "instructionCond", "listlength", "Trial", "Word", 
                     "DeltaSize", "Response", "Correct", "RT", "RT2")
SizeData$ID <- 0
MathData <- as.data.frame(matrix(NA,100*max(dat$ID),7))
names(MathData) <- c("ID", "instructionCond", "listlength", "Trial", "Equation", "Response", "Correct")
MathData$ID <- 0

distTolerance <- 2  # maximal Levenshtein distance for identifying a word
listlength <- 25

IOX <- list()

# Initialize line indices
datIdx <- 1
sizeIdx <- 1
mathIdx <- 1

for (idx in unique(dat$ID)) {
  
  subdat <- subset(dat, ID==idx) 
  memoryCond <- as.numeric(grepl("LTM", subdat$experimental_condition[1]))
  if (grepl("SeqR", subdat$experimental_condition[1])) instructionCond <- 1  # remember
  if (grepl("SeqI", subdat$experimental_condition[1])) instructionCond <- 2  # incidental
  if (grepl("SeqF", subdat$experimental_condition[1])) instructionCond <- 3  # forget
  consent <- as.numeric(subdat[2,c("consent1", "consent2", "consent3")])
  age <- as.numeric(subdat[3,"age"])
  gender <- as.numeric(subdat[3,c("male", "female", "other")])
  lastQ <- subset(subdat, sender=="last question")
  expectQ <- lastQ[1,c("q_memory_yes", "q_memory_no")]

  sizetask <- subset(subdat, sender=="Stimuli")
  
  sizejudgment <- 2 * (as.numeric(sizetask$response == "bigger")-0.5)
  sizecorrect <- sign(sizejudgment) == sign(as.numeric(sizetask$size))
  for (judgment in 1:length(sizejudgment)) {
    SizeData[sizeIdx,"ID"] <- idx
    SizeData[sizeIdx,"memoryCond"] <- memoryCond
    SizeData[sizeIdx,"instructionCond"] <- instructionCond
    SizeData[sizeIdx,"listlength"] <- listlength
    SizeData[sizeIdx,"Trial"] <- judgment
    SizeData[sizeIdx,"Word"] <- sizetask[judgment, "all_words"]
    SizeData[sizeIdx,"DeltaSize"] <- as.numeric(sizetask[judgment, "size"])
    SizeData[sizeIdx,"Response"] <- sizejudgment[judgment]
    SizeData[sizeIdx,"Correct"] <- as.numeric(sizecorrect[judgment])
    SizeData[sizeIdx,"RT"] <- as.numeric(sizetask[judgment, "duration"])
    SizeData[sizeIdx,"RT2"] <- as.numeric(sizetask[judgment, "time_commit"]) - as.numeric(sizetask[judgment, "time_show"])  # backup
    sizeIdx <- sizeIdx + 1
  }
  
  if (memoryCond == 1) {
    mathtask <- subset(subdat, sender=="math_task", select=c("question", "answer"))
    equation <- mathtask$question
    response <- as.numeric(mathtask$answer)
    mathcorrectresp <- NULL
    for (eq in 1:length(response)) {
      leftside <- strsplit(equation, "=")[[eq]][1]
      leftside <- gsub("x", "*", leftside)
      mathcorrectresp[eq] <- eval(parse(text=leftside)) 
    } 
    if (length(response)>1) {
      mathcorrect <- mathcorrectresp[1:(length(response)-1)] == response[2:(length(response))] # response is always in the line of the next equation!
    } else {
      mathcorrect <- mathcorrectresp == response # ... except when there is only 1 equation and 1 response! 
    }
    for (eq in 1:max(1,(length(response)-1))) {
      MathData[mathIdx,"ID"] <- idx
      MathData[mathIdx,"instructionCond"] <- instructionCond
      MathData[mathIdx,"listlength"] <- listlength      
      MathData[mathIdx,"Trial"] <- eq
      MathData[mathIdx,"Equation"] <- strsplit(equation, "=")[[eq]][1]
      MathData[mathIdx,"Response"] <- response[eq+1]
      MathData[mathIdx,"Correct"] <- as.numeric(mathcorrect[eq])
      mathIdx <- mathIdx + 1
    }
  }  
  
  # Pre-final recall
  # if (instructionCond==1) {
    recalltask <- as.data.frame(subset(subdat, sender=="Recall" & ended_on=="form submission"))
    for (listIdx in 1:4) {
      presentedwords <- sizetask[(listlength*(listIdx-1)+1):(listlength*listIdx), "all_words"]
      if (instructionCond == 1) {
        recalledwords <- recalltask[listIdx,c(paste0("word0", 1:9), paste0("word", 10:listlength))]
      } else {
        recalledwords <- rep('',length(presentedwords))
      }
      Data[datIdx:(datIdx+listlength-1), "ID"] <- idx
      Data[datIdx:(datIdx+listlength-1), "consent"] <- prod(consent)
      Data[datIdx:(datIdx+listlength-1), "age"] <- age
      Data[datIdx:(datIdx+listlength-1), "gender"] <- as.numeric(gender[1] + 2*gender[2] + 3*gender[3]) # 1 = male, 2 = female, 3 = other
      Data[datIdx:(datIdx+listlength-1), "expectedMemory"] <- as.numeric(expectQ[1])  # 1 = yes, 0 = no    
      Data[datIdx:(datIdx+listlength-1), "memoryCond"] <- memoryCond
      Data[datIdx:(datIdx+listlength-1), "instructionCond"] <- instructionCond
      Data[datIdx:(datIdx+listlength-1), "listlength"] <- listlength
      Data[datIdx:(datIdx+listlength-1), "ListRecency"] <- listIdx-5
      Data[datIdx:(datIdx+listlength-1), "Position"] <- 1:listlength
      Data[datIdx:(datIdx+listlength-1), "WordPresented"] <- presentedwords
      Data[datIdx:(datIdx+listlength-1), "WordRecalled"] <- unlist(recalledwords)
      for (pos in 1:listlength) Data[datIdx-1+pos, "Inpos"] <- InputPosition(recalledwords[pos], presentedwords, distTolerance)
      datIdx <- datIdx + listlength
    }
  # }
  
  recallfinal <- as.data.frame(subset(subdat, sender=="RecallOfWords"))
  
  presentedwords <- sizetask[(listlength*4+1):(listlength*5), "all_words"]
  recalledwords <- recallfinal[1,c(paste0("word0", 1:9), paste0("word", 10:listlength))]
  whichEnd <- which(grepl("end", recalledwords)|grepl("End", recalledwords))
  recalledwords[grepl("end", recalledwords)|grepl("End", recalledwords)] <- ""  # set to empty string, so it will be coded as omission
  recalledposition <- rep(0,listlength)
  for (pos in 1:listlength) recalledposition[pos] <- InputPosition(recalledwords[pos], presentedwords, distTolerance)
  validrecpos <- recalledposition[recalledposition<(listlength+2)]  # listlength+2 are omissions, for which no box was queried
  if (instructionCond==1) rootask <- subset(subdat, sender=="FindPosition")
  if (instructionCond>1) rootask <- subset(subdat, sender=="FindPosition")
  wordsassigned <- rootask$user_inputs[[1]]
  boxes <- as.numeric(unlist(strsplit(rootask$clicks[[1]], split="box")))
  boxes <- boxes[!is.na(boxes)]
  if (length(whichEnd)>1) {
    boxes <- boxes[-whichEnd[1:(length(whichEnd)-1)]]
  } 
  deltaLength <- length(validrecpos)-length(boxes)    
  
  Data[datIdx:(datIdx+listlength-1), "ID"] <- idx
  Data[datIdx:(datIdx+listlength-1), "consent"] <- prod(consent)
  Data[datIdx:(datIdx+listlength-1), "age"] <- age
  Data[datIdx:(datIdx+listlength-1), "gender"] <- as.numeric(gender[1] + 2*gender[2] + 3*gender[3]) # 1 = male, 2 = female, 3 = other
  Data[datIdx:(datIdx+listlength-1), "expectedMemory"] <- as.numeric(expectQ[1])  # 1 = yes, 0 = no    
  Data[datIdx:(datIdx+listlength-1), "memoryCond"] <- memoryCond
  Data[datIdx:(datIdx+listlength-1), "instructionCond"] <- instructionCond
  Data[datIdx:(datIdx+listlength-1), "listlength"] <- listlength
  Data[datIdx:(datIdx+listlength-1), "ListRecency"] <- 0
  Data[datIdx:(datIdx+listlength-1), "Position"] <- 1:listlength
  Data[datIdx:(datIdx+listlength-1), "WordPresented"] <- presentedwords
  Data[datIdx:(datIdx+listlength-1), "WordRecalled"] <- unlist(recalledwords)
  Data[datIdx:(datIdx+listlength-1), "Inpos"] <- recalledposition 
  
  boxend <- F
  boxpos <- 1
  recpos <- 1
  while (boxend==F) {
    if (recpos > length(recalledposition)) {
      Data[datIdx-1+recpos, "Box"] <- boxes[boxpos]
      boxpos <- boxpos + 1  # if recpos already goes beyond recall positions, advance boxpos and recpos, ...
    } else {
      if (recalledposition[recpos] < (listlength+2)) {
        Data[datIdx-1+recpos, "Box"] <- boxes[boxpos]
        boxpos <- boxpos + 1  # if this is not an omission, advance boxpos and recpos, ...
      }
    }
    recpos <- recpos + 1  # ... otherwise, advance only recpos
    if (boxpos > length(boxes)) boxend <- T
  }
  datIdx <- datIdx + listlength
  Data[Data$ID==idx, "deltaLength"] <- deltaLength
  Data[Data$ID==idx, "numEnd"] <- length(whichEnd)
  
  iox <- matrix(0, listlength+2, listlength)
  for (outpos in 1:listlength) iox[recalledposition[outpos], outpos] <- iox[recalledposition[outpos], outpos] + 1
  IOX[[idx]] <- iox
  
}

# shave off the excess rows
Data <- Data[Data$ID>0,]
MathData <- MathData[MathData$ID>0,]
SizeData <- SizeData[SizeData$ID>0,]

write.csv(Data, "data/oberauer_werner_2021/Incidental_WM_LTM7_Long.Mem.full.txt", row.names=F)


# save
# save(Data, MathData, SizeData, IOX, file=paste0("Incidental_WM_LTM7_Long.RData"))
# write.table(Data, file=paste0("C:/Daten/Rohdaten/WM.LTM/Incidental.WM.LTM/Incidental_WM_LTM7_Long.Mem.txt"), row.names=F)
# write.table(MathData, file=paste0("C:/Daten/Rohdaten/WM.LTM/Incidental.WM.LTM/Incidental_WM_LTM7_Long.Math.txt"), row.names=F)
# write.table(SizeData, file=paste0("C:/Daten/Rohdaten/WM.LTM/Incidental.WM.LTM/Incidental_WM_LTM7_Long.Size.txt"), row.names=F)

# aggData <- aggregate(cbind(deltaLength, numEnd) ~ ID, data=Data, FUN=mean)

