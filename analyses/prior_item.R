extract_prior_item_info <- function(data, key_var, output_var, low=NULL, max_consec=3, max_lag=1) {
  # Gets the type of the prior item in the key_var column, and also calculates
  # the number of consecutive prior items like that
  
  require(tidyverse)
  nTrials <- dim(data)[1]
  data[,key_var] <- as.character(unlist(data[,key_var]))
  
  # extract prev item type for each lag
  for (i in 1:max_lag) {
    prioritem <- unlist(c(rep(NA, i), data[-((nTrials-i+1):nTrials), key_var]))
    
    if (length(prioritem) == nTrials) {
      data[, paste0(output_var, '_prioritem',i)] <- prioritem
    } else {
      data[, paste0(output_var, '_prioritem',i)] <- rep(NA, nTrials)
    }
    # for backward compatibility, if lag=1, create a non-numbered variable
    if (i == 1) {
      data[, paste0(output_var, '_prioritem')] <- prioritem
    }
  }

  # if the low category is specified, get the number of consecuitve low or high values
  if (!is_null(low)) {
    prioritem <- unlist(c(NA, data[-nTrials, key_var]))
    
    consec <- prioritem %>% 
      as.factor() %>% 
      as.numeric() %>% 
      rle() %>% 
      {.$length} %>% 
      sequence()
    
    consec = ifelse(consec > max_consec, max_consec, consec)
    consec_value = ifelse(prioritem == low, -consec +0.5, consec -0.5 ) 
    consec_lab = paste0(prioritem, consec)
    consec_lab = ifelse(consec_lab == "NA1", NA, consec_lab)
    data[, paste0(output_var, '_consec_value')] = consec_value
    data[,paste0(output_var, '_consec_lab')] = consec_lab
  }
  
  return(data)
}

prior_item_analysis <- function(data, key_var, output_var, low=NULL, max_consec=3, max_lag=1) {
  data <- data %>% 
    do(extract_prior_item_info(., key_var,output_var,low=low, max_consec=max_consec, max_lag=max_lag)) %>% 
    ungroup()
  
  if (!is_null(low)) {
    consec_lab <- data[,paste0(output_var, '_consec_lab')] %>% unlist()
    consec_value <- data[,paste0(output_var, '_consec_value')] %>% unlist()
    data[,paste0(output_var, '_consec_lab')] <- reorder(consec_lab, consec_value)
  }
  return(data)
}

g_legend<-function(a.gplot){ 
  tmp <- ggplot_gtable(ggplot_build(a.gplot)) 
  leg <- which(sapply(tmp$grobs, function(x) x$name) == "guide-box") 
  legend <- tmp$grobs[[leg]] 
  return(legend)} 

mean_se2 <- function(x, mult=1.96) {
  x <- stats::na.omit(x)
  se <- mult * sqrt(stats::var(x)/length(x))
  mean <- mean(x)
  data.frame(y = mean, ymin = mean - se, ymax = mean + se)
}
