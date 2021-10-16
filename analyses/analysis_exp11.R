library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp11_corrected/preproc_mem_data.csv')
mathdat <- read.csv('data/exp11_corrected/preproc_math_data.csv')

memdat$id <- as.factor(memdat$id)


size <- read.csv('data/mean_size_ratings.csv')
size <- select(size, -X)
memdat <- left_join(memdat, size, by=c('word1'))

# loc acc for each subject
loc_acc <- memdat %>% 
  group_by(id) %>% 
  summarise(overall_recall_acc = mean(recall_acc),
            overall_loc_acc = mean(loc_acc, na.rm=T)) %>% 
  arrange(overall_loc_acc) %>% print(n=100)

memdat <- left_join(memdat, loc_acc)

# size recall accuracy for each subject
size_acc <- memdat %>% 
  filter(size_group != 1) %>% 
  mutate(size_recall_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(id) %>%
  summarise(size_recall_acc = mean(size_recall_acc)) %>% 
  arrange(size_recall_acc)
memdat <- left_join(memdat, size_acc)
loc_acc <- left_join(loc_acc, size_acc)

arrange(loc_acc, size_recall_acc)
arrange(loc_acc, overall_loc_acc)

# get response RTs to decide whether to exclude participants
memdat %>% 
  ggplot(aes(id, studyRT)) +
  geom_boxplot()


# get subject accuracy
memdat %>% 
  group_by(id) %>% 
  summarise(acc = mean(recall_acc),
            exp_duration = mean(exp_duration)) %>% 
  arrange(acc) %>% 
  print(n=100)

# number of included participants if math acc >= 75%

memdat %>% 
  filter(use_help == "No" & expect_test == "No") %>% 
  select(id) %>% 
  unique() %>% 
  nrow()

memdat %>% 
  select(id, use_help, expect_test) %>% 
  unique() %>% 
  count(use_help, expect_test)

memdat %>% 
  select(id, use_help, expect_test, recall_all_q) %>% 
  unique() %>% 
  count(use_help, expect_test,recall_all_q)

# memacc as a function of math_acc
ggplot(memdat, aes(math_acc, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") 
ggplot(memdat, aes(n, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") 

# plot free recall vs loc accuracy by subject correlation
plot(loc_acc$overall_recall_acc, loc_acc$overall_loc_acc)
cor.test(loc_acc$overall_recall_acc, loc_acc$overall_loc_acc)

#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# table of recall_accuracy per condition
memdat %>% 
  filter(!exclude, overall_loc_acc > 0.25) %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc),
            loc_acc = mean(loc_acc)) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc) %>% round(2),
            loc_acc = mean(loc_acc) %>% round(2)) %>% 
  gather(test_type, acc, recall_acc, loc_acc) %>% 
  spread(trial_condition, acc) %>% 
  mutate(total = (process+remember)/2) %>% 
  arrange(test_type, listid)

# table of counts per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(n = sum(recall_acc)) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(n = mean(n)) %>% 
  spread(trial_condition, n) %>% 
  mutate(total = process+remember)


# main effect of instruction and list, split by stim type
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000) %>% 
  group_by(id,listid, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_recall_acc = mean(recall_acc)) %>%
  # group_by(id) %>%
  # mutate(recall_acc = recall_acc-mean(recall_acc)+overall_recall_acc) %>%
  ggplot(aes(listid, recall_acc, fill=trial_condition, color=trial_condition, label=recall_acc)) +
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
  ggtitle('Experiment 11')
ggsave('figures/exp11_recall_by_list_and_condition.png', width=6.5, height=4.5, units='in')

memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  summarise(rt = mean(studyRT)) %>% 
  mutate(overall_rt = mean(rt)) %>%
  group_by(id) %>%
  mutate(rt = rt-mean(rt)+overall_rt) %>%
  ggplot(aes(listid, rt, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Size judgement RTs during study (ms)") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3')
# ggsave('figures/exp3_studyRTs_by_list_and_condition.png', width=6.5, height=3, units='in')

# effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(trial_condition, recall_acc, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# cumulative effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(cue_consec_value, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# effect of prior cue on study RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  group_by(id, listid, trial_condition) %>% 
  mutate(rel_to_mad = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_mad <= 2.5) %>%
  ggplot(aes(trial_condition, studyRT, color=cue_prioritem, group=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")  +
  scale_y_continuous("Size judgement RTs during study (ms)") +
  scale_x_discrete('Instructions for the current item') +
  scale_color_discrete("Instructions for the\npreceding study item") +
  theme_bw() +
  ggtitle('Experiment 11')
ggsave('figures/exp11_studyRTs_by_current_and_previous_item_instructions.png', width= 5, height=3, units='in')

# cumulative effect of prior cue on RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(reorder(cue_consec_lab,cue_consec_value), studyRT)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# effect of studyRTs on recall_accuracy
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id) %>% 
  mutate(rt = studyRT,
         rt = (rt - mean(rt)),
         rt = ecdf(rt)(rt),
         rt = ceiling(rt*10)/10) %>% 
  ggplot(aes(rt, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_continuous("Study RT quantiles") +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3') +
  theme_bw()
# ggsave('figures/exp3_recall_acc_f(studyRTs).png', width=4, height=3, units='in')

ml1 <- glmer(recall_acc1 ~ listid * trial_condition + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml2 <- glmer(recall_acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml3 <- glmer(recall_acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
summary(ml1)
summary(ml2)
summary(ml3)

memdat %>% 
  ggplot(aes(presented_position,recall_acc)) +
  stat_summary(geom="pointrange")

#############################################################################!
# SOURCE PERFORMANCE                                                     ####
#############################################################################!
# table of location accuracy per condition
memdat %>% 
  filter(!exclude, overall_loc_acc > 0.25) %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(loc_acc = mean(loc_acc)) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(loc_acc = mean(loc_acc) %>% round(2)) %>% 
  spread(trial_condition, loc_acc) %>% 
  mutate(total = (process+remember)/2)


# overall loc acc as a function of presented position
memdat %>% 
  ggplot(aes(presented_position,loc_acc)) +
  stat_summary(geom="pointrange")

# histogram of responded locations
memdat %>% 
  ggplot(aes(loc_resp)) +
  geom_histogram()

# histogram of responded locations by subject
memdat %>% 
  ggplot(aes(loc_resp)) +
  geom_histogram() +
  facet_wrap(~id)

#histogram of responded location RTs
memdat %>% 
  filter(loc_rt < 10000) %>% 
  ggplot(aes(loc_rt)) +
  geom_histogram()

sort(memdat$loc_rt)



# loc acc as a function of cue type
memdat %>% 
  filter(loc_rt > 500, !exclude) %>%
  filter(!exclude, overall_loc_acc > 0.25, listid==2) %>% 
  ungroup() %>% 
  mutate(overall_loc_acc = mean(loc_acc)) %>% 
  group_by(id) %>% 
  mutate(loc_acc = loc_acc - mean(loc_acc) + overall_loc_acc) %>%  
  group_by(id, listid, trial_condition) %>% 
  summarise(loc_acc = mean(loc_acc)) %>% 
  ggplot(aes(trial_condition, loc_acc, color=trial_condition, fill=trial_condition, group=1)) +
  geom_point(position = position_jitter(width=0.2), alpha=0.2, size=1.5) +
  stat_summary(geom="line", color='black') +
  stat_summary(geom="errorbar", width=0.05) +
  stat_summary(color='black', shape=21, size=0.5) +
  theme_bw() +
  coord_cartesian(ylim=c(0,1)) +
  scale_x_discrete('Memory instructions', breaks=c(1,2)) +
  scale_y_continuous('Source memory accuracy', breaks=c(0.25,0.5,0.75,1)) +
  scale_color_discrete('Memory instructions') +
  scale_fill_discrete('Memory instructions') +
  ggtitle('Experiment 11') 
ggsave('figures/exp11_source_memory_acc.png', width=5, height=3.5)

glmer(loc_acc ~ trial_condition + (1|id), data=filter(memdat, loc_rt > 500, !exclude, listid==2), family="binomial") %>% summary()


memdat %>% 
  filter(loc_rt > 500, loc_rt < 10000, !exclude) %>%
  filter(!exclude, overall_loc_acc > 0.25, listid==2) %>% 
  group_by(id, trial_condition, loc_acc) %>% 
  mutate(rel_to_mad = abs(loc_rt-median(loc_rt))/mad(loc_rt)) %>% 
  filter(rel_to_mad <= 2.5) %>% 
  ungroup() %>% 
  mutate(overall_loc_rt = mean(loc_rt)) %>% 
  group_by(id) %>% 
  mutate(loc_rt = loc_rt - mean(loc_rt) + overall_loc_rt) %>%  
  group_by(id, listid, trial_condition, loc_acc) %>% 
  summarise(loc_rt = mean(loc_rt)) %>% 
  ggplot(aes(loc_acc, loc_rt, color=trial_condition, fill=trial_condition)) +
  stat_summary(geom="line") +
  stat_summary(geom="errorbar", width=0.05) +
  stat_summary(color='black', shape=21, size=0.5) +
  # geom_violin() +
  theme_bw() +
  # coord_cartesian(ylim=c(0,1)) +
  # scale_x_discrete('Memory instructions', breaks=c(1,2)) +
  scale_color_discrete('Memory instructions') +
  scale_fill_discrete('Memory instructions') +
  ggtitle('Experiment 11') 

mldat <- memdat %>% 
  filter(loc_rt > 500, loc_rt < 10000, !exclude) %>%
  filter(!exclude, overall_loc_acc > 0.25, listid==2) %>%
  group_by(id) %>% 
  mutate(rel_to_mad = abs(loc_rt-median(loc_rt))/mad(loc_rt)) %>% 
  filter(rel_to_mad <= 2.5)

lmer(loc_rt ~ loc_acc * trial_condition + (trial_condition|id), data=mldat) %>% summary()


memdat %>% 
  filter(loc_rt > 500) %>% 
  ggplot(aes(study_position, loc_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  geom_smooth()

memdat %>% 
  filter(loc_rt > 500) %>% 
  ggplot(aes(round((loc_test_serial_position-study_position)/5)*5, loc_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  geom_smooth()

table(memdat$presented_position, memdat$loc_resp)


memdat %>% 
  filter(loc_rt > 500) %>%
  ggplot(aes(recall_acc, loc_acc, color=trial_condition, fill=trial_condition)) +
  stat_summary(geom="line") +
  stat_summary(geom="errorbar", width=0.05) +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  coord_cartesian(ylim=c(0.25,1))



#############################################################################!
# Determine "correct" response for size judgement                        ####
#############################################################################!



memdat %>% 
  # filter(stimulus_condition == "words") %>% 
  ggplot(aes(size_group, as.numeric(resp == "larger"), color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,1))

memdat %>% 
  # filter(stimulus_condition == "words") %>% 
  ggplot(aes(size_group, recall_acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,1)) +
  facet_wrap(~resp)

memdat %>% 
  filter(size_group != 1) %>% 
  mutate(size_recall_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(trial_condition) %>% 
  summarise(size_recall_acc = mean(size_recall_acc))

memdat %>% 
  filter(size_group != 1) %>% 
  mutate(size_recall_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(trial_condition, listid) %>% 
  summarise(size_recall_acc = mean(size_recall_acc))

memdat %>% 
  filter(size_group != 1) %>% 
  mutate(size_recall_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(id) %>%
  summarise(size_recall_acc = mean(size_recall_acc)) %>% 
  arrange(size_recall_acc)


