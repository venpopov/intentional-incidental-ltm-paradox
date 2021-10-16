library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp9/preproc_mem_data.csv')
mathdat <- read.csv('data/exp9/preproc_math_data.csv')

# number of included participants
memdat %>% select(id, use_help, expect_test) %>% unique() 
memdat %>% select(id, use_help, expect_test) %>% unique() %>% ungroup() %>%  count(use_help, expect_test)

#overall accuracy
overall_acc = memdat %>% 
  group_by(id) %>% 
  summarise(acc = mean(acc)) %>% 
  arrange(acc) %>% 
  print(n=200)

# math accuracy
math_acc = mathdat %>% 
  group_by(id) %>% 
  summarise(math_acc = mean(answer == cresp, na.rm=T),
            math_n = length(id)) %>% 
  arrange(math_acc) %>% 
  print(n=200)
memdat <- left_join(memdat, math_acc)

# exclude those that used help or have 0 accuracy
memdat <- memdat %>% 
  group_by(id) %>% 
  mutate(overall_acc = mean(acc)) %>% 
  mutate(exclude = use_help == "Yes" | expect_test == "yes" | overall_acc == 0)

#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# overall accuracy per instruction
memdat %>% 
  filter(!exclude, listid == 3) %>% 
  group_by(id, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

# listid and trial_condition on acc
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>%
  group_by(id,listid, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  ggplot(aes(listid, acc, fill=trial_condition, color=trial_condition, label=acc)) +
  geom_point(position = position_jitter(width=0.2), alpha=0.2, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  scale_fill_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 6 - Free recall')
ggsave('figures/exp6_recall_by_trialtype.png',width=4.5, height=3, units='in')


# listid and trial_condition on studyrt
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  ggplot(aes(listid, studyRT, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# listid and previous trial_condition on studyrt
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(listid, studyRT, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")


# effect of studyRTs on accuracy
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id) %>% 
  mutate(rt = studyRT,
         rt = (rt - mean(rt)),
         rt = ecdf(rt)(rt),
         rt = ceiling(rt*10)/10) %>% 
  ggplot(aes(rt, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("Study RT quantiles") +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3') +
  theme_bw()

memdat %>% 
  arrange(id, listid, desc(study_position)) %>% 
  group_by(id, listid) %>% 
  prior_item_analysis('studyRT','subsequent_studyRT') %>% 
  select(-subsequent_studyRT_prioritem) %>% 
  rename(subsequent_studyRT = subsequent_studyRT_prioritem1) %>% 
  arrange(id, listid, study_position) %>% 
  mutate(studyRT = as.numeric(studyRT),
         subsequent_studyRT = as.numeric(subsequent_studyRT)) %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(subsequent_studyRT)) %>% 
  group_by(id) %>% 
  mutate(rt = subsequent_studyRT,
         rt = (rt - mean(rt)),
         rt = ecdf(rt)(rt),
         rt = ceiling(rt*10)/10) %>% 
  ggplot(aes(rt, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("Study RT quantiles") +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3') +
  theme_bw()

# check size ratings

# size ratings as a function of relative difference based on average ratings in all exps
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# size ratings for process and remember items as a function of relative difference based on average ratings in all exps
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("Relative real-word size difference between current object and previous object") +
  scale_y_continuous("Proportion of 'Current object is LARGER than previous object'") +
  scale_color_discrete("Type of preceding item") +
  theme_bw() +
  coord_cartesian(ylim=c(0,1)) +
  ggtitle('Experiment 6 - size ratings performance')
ggsave('figures/exp6_size_judgements_performance.png',width=7, height=5, units='in')

memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=cue_prioritem, shape=as.factor(listid), linetype=as.factor(listid))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("Relative real-word size difference between current object and previous object") +
  scale_y_continuous("Proportion of 'Current object is LARGER than previous object'") +
  scale_color_discrete("Type of preceding item") +
  scale_shape_discrete("List Number") +
  scale_linetype_discrete("List Number") +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  coord_cartesian(ylim=c(0,1)) +
  ggtitle('Experiment 6 - size ratings performance')
ggsave('figures/exp6_size_judgements_performance_by_list.png',width=7, height=5, units='in')

memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=as.factor(study_position))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

glmer(as.numeric(resp=="larger") ~ size_diff * cue_prioritem + (1|id), family="binomial", data=filter(memdat, !exclude, studyRT > 500, studyRT <= 10000)) %>% summary()



# listid and trial_condition on acc as a function of size judgement acc
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, size_diff != 0) %>% 
  mutate(size_acc = as.numeric((resp == "larger" & size_diff > 0) | resp == "smaller" & size_diff < 0)) %>% 
  ggplot(aes(listid, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,0.5)) +
  facet_wrap(~size_acc)


memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  ggplot(aes(study_position, acc, color=trial_condition)) +
  stat_summary(geom="point") +
  geom_smooth()


memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  group_by(id, cue_prioritem, abs(size_diff)) %>% 
  summarise(p_larger = mean(as.numeric(ifelse(size_diff>=0, resp == "larger", resp == "smaller")))) %>% 
  group_by(cue_prioritem, `abs(size_diff)`) %>% 
  summarise(acc_se = sd(p_larger)/sqrt(length(p_larger)),
            acc = mean(p_larger),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)
