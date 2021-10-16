library(tidyverse)
library(patchwork)

# Expeirment 4 

dat <- read.delim('data/oberauer_werner_2021/Incidental_WM_LTM4_Long.Mem.txt', header = T, sep = ' ')

dat$Inpos %>% table()


(f1 <- dat %>% 
  filter(ListRecency == 0) %>% 
  mutate(intrusion = ifelse(Inpos > listlength & WordRecalled != "",1,0)) %>% 
  group_by(ID, instructionCond, memoryCond, listlength) %>% 
  summarise(n_intrusions = sum(intrusion)) %>% 
  # group_by(listlength, instructionCond, memoryCond) %>% 
  # summarise(n_intrusions = mean(n_intrusions)) %>% 
  filter(memoryCond == 1) %>% 
  ggplot(aes(listlength, n_intrusions, color=as.factor(instructionCond))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("List length") +
  scale_y_continuous("Number of intrusions") +
  scale_color_discrete("Memory instructions", labels=c('Remember','Forget','Incidental')) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  ggtitle("Reanalysis of the LTM condition in\nExp 4 of Oberauer & Greve (In press)") +
  coord_cartesian(ylim=c(0,2)))
ggsave('figures/KO_intrusions.png',width=6, height=4)


# Experiment 7

dat <- read.csv('data/oberauer_werner_2021/Incidental_WM_LTM7_Long.Mem.full.txt')

dat <- dat %>% 
  filter(memoryCond == 1) %>% 
  mutate(WordPresented = tolower(WordPresented),
         WordRecalled = tolower(WordRecalled))

dat0 <- filter(dat, ListRecency == 0)
dat0$intrusions <- NA
dat0$listorigin <- NA
for (id in unique(dat$ID)) {
  recalled <- filter(dat, ID == id, ListRecency == 0)$WordRecalled
  dattmp <- filter(dat, ID == id, ListRecency != 0)
  intrusions <- as.numeric(recalled %in% dattmp$WordPresented)
  print(length(intrusions))
  dat0[dat0$ID == id,]$intrusions <- intrusions
  
  listorigin <- c()
  for (word in recalled) {
    idx = which(dattmp$WordPresented == word)
    if (length(idx) > 0) listorigin = c(listorigin, dattmp[idx,]$ListRecency)
    else listorigin = c(listorigin, NA)
  }
  dat0[dat0$ID == id,]$listorigin <- listorigin
}

dat0$listorigin <- ifelse(!is.na(dat0$listorigin), dat0$listorigin, ifelse(dat0$Inpos < 26, 0, NA))


dat %>% 
  filter(ListRecency == 0) %>% 
  mutate(intrusion = ifelse(Inpos == 26 & WordRecalled != "end", 1, 0)) %>% 
  group_by(ID, instructionCond, ListRecency) %>% 
  summarise(n_intrusions = sum(intrusion)) %>% 
  ggplot(aes(as.factor(instructionCond), n_intrusions)) +
  stat_summary(geom="pointrange") +
  scale_x_discrete("Memory instructions", labels=c('Remember','Forget','Incidental')) +
  coord_cartesian(ylim=c(0,10))


# previous list intrusions
dat0 %>% 
  filter(ListRecency == 0) %>% 
  # mutate(intrusion = ifelse(Inpos == 26 & WordRecalled != "end", 1, 0)) %>% 
  group_by(ID, instructionCond, ListRecency) %>% 
  summarise(n_intrusions = sum(intrusions)) %>% 
  ggplot(aes(as.factor(instructionCond), n_intrusions)) +
  stat_summary(geom="pointrange") +
  scale_x_discrete("Memory instructions", labels=c('Remember','Forget','Incidental')) +
  coord_cartesian(ylim=c(0,10))


intrdat <- dat0 %>% 
  filter(ListRecency == 0) %>%
  # mutate(intrusion = ifelse(Inpos == 26 & WordRecalled != "end", 1, 0)) %>% 
  group_by(ID, instructionCond, listorigin) %>% 
  count() %>% 
  ungroup() %>% 
  complete(listorigin,ID, fill = list(n=0)) %>% 
  arrange(ID, listorigin) %>% 
  group_by(ID) %>% 
  mutate(instructionCond = max(instructionCond, na.rm=T))
  
(f2 <- intrdat %>% 
  ggplot(aes(listorigin, n, color=as.factor(instructionCond), group=as.factor(instructionCond))) +
  stat_summary(geom="pointrange") +
  scale_color_discrete("Memory instructions", labels=c('Remember','Forget','Incidental')) +
  coord_cartesian(ylim=c(0,10)) +
  stat_summary(geom="line") +
  scale_x_continuous('List on which the recalled word\nwas originally presented', labels=c(1:5)) +
  scale_y_continuous('Number of words recalled on the last list (#5)') +
  ggtitle('Reanalysis of Exp 7\n of Oberauer & Greve (In press)') + 
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()))
ggsave('figures/KO_intrusions_exp7.png',width=6, height=4)

f1+theme(legend.position="none")+f2
ggsave('figures/KO_intrusions_e4_e7.png', width=9, height=4)

intrdat %>% 
  filter(!is.na(listorigin)) %>% 
  mutate(intrusion = listorigin <0) %>% 
  group_by(intrusion, ID) %>%
  summarise(n = sum(n)) %>% 
  group_by(intrusion) %>% 
  summarise(n = mean(n))
