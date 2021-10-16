library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat1 <- read.csv('data/exp1/preproc_mem_data.csv')
mathdat1 <- read.csv('data/exp1/preproc_math_data.csv')
testdat1 <- read.csv('data/exp1/preproc_test_data.csv')

memdat1$id <- as.factor(memdat1$id)
memdat1$exp <- "Exp. 1"

memdat2 <- read.csv('data/exp2/preproc_mem_data.csv')
mathdat2 <- read.csv('data/exp2/preproc_math_data.csv')
testdat2 <- read.csv('data/exp2/preproc_test_data.csv')

memdat2$id <- as.factor(memdat2$id)
memdat2$exp <- "Exp. 2"

memdat3 <- read.csv('data/exp3/preproc_mem_data.csv')
mathdat3 <- read.csv('data/exp3/preproc_math_data.csv')
testdat3 <- read.csv('data/exp3/preproc_test_data.csv')

memdat3$id <- as.factor(memdat3$id)
memdat3$exp <- "Exp. 3"

memdat6 <- read.csv('data/exp6/preproc_mem_data.csv')
mathdat6 <- read.csv('data/exp6/preproc_math_data.csv')
# testdat6 <- read.csv('data/exp6/preproc_test_data.csv')

memdat6$id <- as.factor(memdat6$id)
memdat6$exp <- "Exp. 4"



memdat <- bind_rows(memdat1, memdat2, memdat3, memdat6)

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
  mutate(total = process+remember)

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
  ggtitle('Experiment 2')
ggsave('figures/exp2_recall_by_list_and_condition.png', width=6.5, height=4.5, units='in')

memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition,exp) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3) %>%
  group_by(id,trial_condition, stimulus_condition,exp) %>% 
  summarise(rt = mean(studyRT)) %>% 
  group_by(stimulus_condition) %>%
  mutate(overall_rt = mean(rt)) %>%
  group_by(id) %>%
  mutate(rt = rt-mean(rt)+overall_rt) %>%
  ggplot(aes(exp, rt, color=trial_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("Experiment", breaks=c(1,2,3)) +
  scale_y_continuous("Size judgement RTs during study (ms)") +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember"))
# ggtitle('Experiment 2')
# ggsave('figures/exp2_studyRTs_by_list_and_condition.png', width=6.5, height=3, units='in')

mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition,exp) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3)
lmer(studyRT ~ exp*trial_condition + (1|id), data=memdat %>% filter(!exclude, studyRT <= 10000, studyRT >= 500)) %>% summary()
lmer(studyRT ~ exp*trial_condition + (1|id), data=mldat) %>% summary()

lmer(studyRT ~ 0 + trial_condition + as.factor(exp):trial_condition + cue_prioritem + (1|id), data=mldat) %>% summary()


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
  scale_y_continuous("Size judgement RTs (ms)") +
  scale_x_discrete('Instructions for the current item') +
  scale_color_discrete("Instructions for the\npreceding study item") +
  theme_bw() +
  facet_wrap(~exp, nrow=1) +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        legend.position = "top")
ggsave('figures/exp123_studyRTs_by_current_and_previous_item_instructions.png', width= 6.5, height=2.8, units='in')

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
  ggtitle('Experiment 2') +
  theme_bw()
ggsave('figures/exp2_acc_f(studyRTs).png', width=4, height=3, units='in')

ml1 <- glmer(acc1 ~ listid * trial_condition + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml2 <- glmer(acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml3 <- glmer(acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
summary(ml1)
summary(ml2)
summary(ml3)


mldat <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id, listid) %>% 
  mutate(studyRT = scale(studyRT)[,1])
ml1 <- glmer(acc1 ~ listid * trial_condition + (1|id) + (1|word1), data=mldat, family='binomial')
ml2 <- glmer(acc1 ~ listid * trial_condition + studyRT + (1|id) + (1|word1), data=mldat, family='binomial')
ml3 <- glmer(acc1 ~ stimulus_condition*studyRT*trial_condition + (1|id) + (1|word1), data=mldat, family='binomial')
ml4 <- glmer(acc1 ~ stimulus_condition*trial_condition + studyRT  + (1|id) + (1|word1), data=mldat, family='binomial')
ml5 <- glmer(acc1 ~ stimulus_condition*trial_condition + studyRT  + cue_prioritem1 + (1|id) + (1|word1), data=mldat, family='binomial')
ml6 <- glmer(acc1 ~ stimulus_condition*trial_condition + studyRT  + cue_prioritem1*trial_condition + (1|id) + (1|word1), data=mldat, family='binomial')
ml7 <- glmer(acc1 ~ stimulus_condition*trial_condition + studyRT  + cue_consec_value + (1|id) + (1|word1), data=mldat, family='binomial')
ml8 <- glmer(acc1 ~ stimulus_condition*trial_condition + studyRT  + cue_consec_value*trial_condition + (1|id) + (1|word1), data=mldat, family='binomial')
summary(ml1)
summary(ml2)
summary(ml3)
summary(ml4)
summary(ml5)
summary(ml6)
summary(ml7)
summary(ml8)

#############################################################################!
# Determine "correct" response for size judgement                        ####
#############################################################################!


size <- read.csv('data/mean_size_ratings.csv')
size <- select(size, -X)
memdat <- left_join(memdat, size, by=c('word1'))

memdat %>% 
  filter(stimulus_condition == "words") %>% 
  ggplot(aes(size_group, as.numeric(resp == "larger"), color=trial_condition, shape=as.factor(listid))) +
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
