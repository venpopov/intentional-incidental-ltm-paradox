library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp3/preproc_mem_data.csv')
mathdat <- read.csv('data/exp3/preproc_math_data.csv')
testdat <- read.csv('data/exp3/preproc_test_data.csv')

memdat$id <- as.factor(memdat$id)


# get response RTs to decide whether to exclude participants
memdat %>% 
  ggplot(aes(id, studyRT)) +
  geom_boxplot()


# get subject accuracy
memdat %>% 
  group_by(id) %>% 
  summarise(acc = mean(acc),
            exp_duration = mean(exp_duration)) %>% 
  arrange(acc) %>% 
  print(n=100)

# number of included participants if math acc >= 75%
memdat %>% 
  filter(use_help == "No" & expect_test == "No" & math_acc >= 0.75) %>% 
  select(id) %>% 
  unique() %>% 
  nrow()

# memacc as a function of math_acc
ggplot(memdat, aes(math_acc, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") 
ggplot(memdat, aes(n, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") 

#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# table of accuracy per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, stimulus_condition,trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(stimulus_condition, listid, trial_condition) %>% 
  summarise(acc = mean(acc) %>% round(2)) %>% 
  spread(trial_condition, acc) %>% 
  mutate(total = (process+remember)/2)

# overall accuracy per instruction
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude) %>% 
  group_by(id,listid, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(listid, trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(listid, trial_condition, stimulus_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)


# overall RTs per instruction
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3) %>% 
  group_by(trial_condition) %>% 
  mutate(rt = studyRT) %>% 
  summarise(rt_se = sd(rt)/sqrt(length(rt)),
            rt = mean(rt),
            rt_lower95 = rt-1.96*rt_se,
            rt_upper95 = rt+1.96*rt_se)

mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3)

lmer(studyRT ~ trial_condition + (1|id), data=mldat) %>% summary() 

# number of excluded rts at each outlier removal stage
nrow(filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500))/nrow(filter(memdat, !exclude))

nrow(mldat)/nrow(filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500))


# table of counts per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, stimulus_condition,trial_condition) %>% 
  summarise(n = sum(acc1 + ifelse(!is.na(acc2), acc2,0))) %>% 
  group_by(stimulus_condition, listid, trial_condition) %>% 
  summarise(n = mean(n)) %>% 
  spread(trial_condition, n) %>% 
  mutate(total = process+remember)


# main effect of instruction and list, split by stim type
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_acc = mean(acc)) %>%
  # group_by(id) %>%
  # mutate(acc = acc-mean(acc)+overall_acc) %>%
  ggplot(aes(listid, acc, fill=trial_condition, color=trial_condition, label=acc)) +
  geom_point(position = position_jitter(width=0.2), alpha=0.2, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  facet_wrap(~stimulus_condition) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  scale_fill_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3')
ggsave('figures/exp3_recall_by_list_and_condition.png', width=6.5, height=3, units='in')

memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  summarise(rt = mean(studyRT)) %>% 
  group_by(stimulus_condition) %>%
  mutate(overall_rt = mean(rt)) %>%
  group_by(id) %>%
  mutate(rt = rt-mean(rt)+overall_rt) %>%
  ggplot(aes(listid, rt, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Size judgement RTs during study (ms)") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 3')
ggsave('figures/exp3_studyRTs_by_list_and_condition.png', width=6.5, height=3, units='in')

# effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(trial_condition, acc, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

# cumulative effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(cue_consec_value, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)

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
  ggtitle('Experiment 3')
ggsave('figures/exp3_studyRTs_by_current_and_previous_item_instructions.png', width= 5, height=3, units='in')

# cumulative effect of prior cue on RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(reorder(cue_consec_lab,cue_consec_value), studyRT, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition) 

# effect of studyRTs on accuracy
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id, stimulus_condition) %>% 
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
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank())
ggsave('figures/exp3_acc_f(studyRTs).png', width=4.2, height=3, units='in')

ml1 <- glmer(acc1 ~ listid * trial_condition + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml2 <- glmer(acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml3 <- glmer(acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
summary(ml1)
summary(ml2)
summary(ml3)



#############################################################################!
# Determine "correct" response for size judgement                        ####
#############################################################################!


size <- read.csv('data/mean_size_ratings.csv')
size <- select(size, -X)
memdat <- left_join(memdat, size, by=c('word1'))

memdat %>% 
  filter(stimulus_condition == "words") %>% 
  ggplot(aes(size_group, as.numeric(resp == "larger"), color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,1))

memdat %>% 
  filter(stimulus_condition == "words") %>% 
  ggplot(aes(size_group, acc, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,1)) +
  facet_wrap(~resp)

memdat %>% 
  filter(stimulus_condition == "words", size_group != 1) %>% 
  mutate(size_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(trial_condition) %>% 
  summarise(size_acc = mean(size_acc))

memdat %>% 
  filter(stimulus_condition == "words", size_group != 1) %>% 
  mutate(size_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(trial_condition, listid) %>% 
  summarise(size_acc = mean(size_acc))


