library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat4 <- read.csv('data/exp4/preproc_mem_data.csv')
mathdat4 <- read.csv('data/exp4/preproc_math_data.csv')
memdat5 <- read.csv('data/exp5/preproc_mem_data.csv')
mathdat5 <- read.csv('data/exp5/preproc_math_data.csv')

memdat4$exp <- 4
memdat4$foil <- "new"
memdat5$exp <- 5
memdat5$foil <- "list2"

memdat <- bind_rows(memdat4,memdat5)
mathdat <- bind_rows(mathdat4, mathdat5)

# number of included participants
memdat %>% 
  filter(use_help == "No" & expect_test == "No") %>% 
  select(id, exp) %>% 
  unique() %>% 
  count(exp)

memdat <- memdat %>% 
  mutate(id = as.factor(id),
         exclude = use_help == "Yes" | expect_test == "yes")

mathdat <- mathdat %>% 
  mutate(id = as.factor(id))

# get response RTs to decide whether to exclude participants
memdat %>% 
  ggplot(aes(id, studyRT)) +
  geom_boxplot()

memdat %>% 
  ggplot(aes(id, recogRT)) +
  geom_boxplot()

memdat %>% 
  group_by(id) %>% 
  summarise(medRT = median(studyRT)) %>% 
  print(n = 1000)

memdat %>% 
  group_by(id) %>% 
  summarise(medRT = median(recogRT, na.rm=T)) %>% 
  print(n = 1000)

sort(memdat$studyRT, decreasing=T)


# get equation accuracy
matacc <- mathdat %>% 
  filter(!is.na(cresp), !is.na(answer)) %>% 
  group_by(id) %>% 
  summarise(math_acc = mean(answer == cresp),
            n = length(question)) %>% 
  arrange(math_acc) %>% 
  print(n=100)

memdat <- left_join(memdat, matacc)

# get subject accuracy
overall_acc <- memdat %>% 
  group_by(id) %>% 
  summarise(overall_recall_acc = mean(recall_acc, na.rm=T),
            overall_recog_acc = mean(recog_acc, na.rm=T)) %>% 
  arrange(overall_recall_acc) %>% 
  print(n=100)

memdat <- memdat %>% 
  mutate(exclude = ifelse(id == "18336", TRUE, exclude))

memdat <- left_join(memdat, overall_acc, by=c('id'))

memdat %>% 
  filter(use_help == "Yes" | expect_test == "yes") %>% 
  group_by(id, use_help, expect_test, trial_condition) %>% 
  summarise(acc = mean(recall_acc))

# number of included participants
memdat %>% 
  filter(use_help == "No" & expect_test == "No") %>% 
  select(id) %>% 
  unique() %>% 
  nrow()

# number of included participants if math acc >= 80%
memdat %>% 
  filter(use_help == "No" & expect_test == "No" & math_acc >= 0.75) %>% 
  select(id) %>% 
  unique() %>% 
  nrow()

# number of included participants if recog_acc < 100%
memdat %>% 
  filter(use_help == "No" & expect_test == "No" & overall_recog_acc < 1) %>% 
  select(id, exp) %>% 
  unique() %>% 
  count(exp) 

# memacc as a function of math_acc
ggplot(memdat, aes(math_acc, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") 


#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

memdat %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc),
            recog_acc = mean(recog_acc, na.rm=T)) %>% 
  print(n=100)



memdat %>% 
  group_by(!exclude, overall_recog_acc==1, listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc),
            recog_acc = mean(recog_acc, na.rm=T))

memdat %>% 
  group_by(recall_all_q, listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc),
            recog_acc = mean(recog_acc, na.rm=T))

# depending on whether they tried to recall all words in the final test
memdat %>% 
  filter(!exclude) %>% 
  ggplot(aes(listid, recog_acc, color=trial_condition)) +
  stat_summary() +
  facet_wrap(~recall_all_q)


# main effect of instruction and list, excluding weird study durations
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000) %>% 
  gather(test_type, acc, recall_acc, recog_acc) %>% 
  filter(!(test_type == "recall_acc" & listid == 3)) %>% 
  ggplot(aes(listid, acc, color=trial_condition, linetype=foil, shape=foil)) +
  stat_summary() +
  stat_summary(geom="line") +
  facet_wrap(~test_type)

memdat %>% 
  filter(studyRT <= 10000, studyRT >= 500) %>% 
  filter(listid == 3) %>% 
  ggplot(aes(study_position, recog_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  geom_smooth()

memdat %>% 
  filter(studyRT <= 10000, studyRT >= 500) %>% 
  ggplot(aes(listid, studyRT, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  facet_wrap(~stimulus_condition)

memdat %>% 
  filter(studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1]) %>%
  mutate(studyRT = ecdf(studyRT)(studyRT)) %>% 
  mutate(studyRT = ceiling(studyRT*10)/10) %>% 
  ggplot(aes(studyRT, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  geom_smooth(se=F) +
  xlab('Size judgement RTs (quantiles)') +
  facet_wrap(~stimulus_condition)

# effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(trial_condition, recall_acc, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)


# cumulative effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(cue_consec_value, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)

# effect of prior cue on study RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(trial_condition, studyRT, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)

# cumulative effect of prior cue on RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(reorder(cue_consec_lab, cue_consec_value), studyRT, group=1)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") + 
  facet_wrap(~stimulus_condition)


mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3, overall_recog_acc < 1) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1])


ml0 <- glmer(recog_acc ~ 1 + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml1 <- glmer(recog_acc ~ trial_condition + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml2 <- glmer(recog_acc ~ trial_condition + foil + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml3 <- glmer(recog_acc ~ trial_condition * foil + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
summary(ml1)
anova(ml0,ml1, ml2, ml3)


#dprime
d <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3) %>% 
  group_by(id, exp, foil, trial_condition) %>% 
  summarise(d = qnorm(mean(recog_acc))-qnorm(mean(1-recog_acc)),
            d = ifelse(is.infinite(d), qnorm(14.5/15)-qnorm(0.5/15), d))

ggplot(d, aes(trial_condition, d, color=foil)) +
  stat_summary(geom="pointrange")
