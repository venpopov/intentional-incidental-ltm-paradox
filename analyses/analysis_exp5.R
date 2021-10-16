library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp5/preproc_mem_data.csv')
mathdat <- read.csv('data/exp5/preproc_math_data.csv')



# get subject accuracy
overall_acc <- memdat %>% 
  group_by(id) %>% 
  summarise(overall_recall_acc = mean(recall_acc),
            overall_recog_acc = mean(recog_acc, na.rm=T)) %>% 
  arrange(overall_recall_acc) %>% 
  print(n=100)

memdat %>% 
  filter(use_help == "No" & expect_test == "No") %>% 
  group_by(id) %>% 
  summarise(overall_recall_acc = mean(recall_acc),
            overall_recog_acc = mean(recog_acc, na.rm=T)) %>% 
  arrange(overall_recall_acc) %>%
  arrange(overall_recog_acc)  %>% 
  print(n=100)

table(overall_acc$overall_recog_acc == 1)

memdat <- left_join(memdat, overall_acc, by=c('id'))

memdat %>% 
  filter(use_help == "Yes" | expect_test == "yes") %>% 
  group_by(id, use_help, expect_test, trial_condition) %>% 
  summarise(acc = mean(recall_acc))


#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# table of accuracy per condition
memdat %>% 
  filter(!exclude,) %>% 
  group_by(id, listid, stimulus_condition,trial_condition) %>% 
  summarise(acc = mean(ifelse(listid == 3, recog_acc, recall_acc))) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(acc = mean(acc) %>% round(2)) %>% 
  spread(trial_condition, acc) %>% 
  mutate(total = (process+remember)/2) %>% 
  ungroup() %>% 
  mutate(test_type = c('Free recall','Free recall','2AFC item recognition'))

# table of counts per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(n = sum(ifelse(listid == 3, recog_acc, recall_acc))) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(n = mean(n)) %>% 
  spread(trial_condition, n) %>% 
  mutate(total = process+remember) %>% 
  ungroup() %>% 
  mutate(test_type = c('Free recall','Free recall','2AFC item recognition'))

memdat %>% 
  group_by(overall_recog_acc==1, listid, trial_condition) %>% 
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
  mutate(test_type = ifelse(test_type == "recall_acc"," Free recall","2AFC recognition")) %>% 
  group_by(id, test_type, trial_condition, listid) %>% 
  summarise(acc = mean(acc)) %>% 
  ggplot(aes(listid, acc, color=trial_condition)) +
  stat_summary(geom = "errorbar", width=0.15) +
  stat_summary(geom="point", size=1) +
  stat_summary(geom="line") +
  facet_wrap(~test_type) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Recall probability or Recognition hit rates") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  scale_fill_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 5') +
  coord_cartesian(ylim=c(0,1))
ggsave('figures/exp5_recall_recog_by_list_and_condition.png', width=6.5, height=3.5, units='in')


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
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1])


ml0 <- glmer(recog_acc ~ 1 + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml1 <- glmer(recog_acc ~ trial_condition + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
summary(ml1)
anova(ml0,ml1)


mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3, overall_recog_acc < 1) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1])


ml0 <- glmer(recog_acc ~ 1 + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml1 <- glmer(recog_acc ~ trial_condition + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
summary(ml1)
anova(ml0,ml1)





memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3) %>% 
  ggplot(aes(trial_condition, recog_acc, color=l2_recall)) +
  stat_summary(geom="pointrange")


mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, listid == 3, overall_recog_acc < 1) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1])

ml0 <- glmer(recog_acc ~ 1 + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml1 <- glmer(recog_acc ~ trial_condition + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
ml2 <- glmer(recog_acc ~ trial_condition + l2_recall + (1|id), data=mldat, family="binomial", control=glmerControl(optimizer="bobyqa"))
summary(ml1)
summary(ml2)
anova(ml0,ml1,ml2)


#############################################################################!
#                                                                        ####
#############################################################################!


memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid==3) %>% 
  ggplot(aes(study_position, recog_acc, color=trial_condition)) +
  stat_summary(geom="pointrange")


# effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem), listid==3) %>% 
  ggplot(aes(cue_consec_value, recog_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)
