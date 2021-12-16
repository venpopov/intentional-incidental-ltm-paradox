library(tidyverse)
library(lme4)
library(brms)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp1/preproc_mem_data.csv')
mathdat <- read.csv('data/exp1/preproc_math_data.csv')
testdat <- read.csv('data/exp1/preproc_test_data.csv')

memdat$id <- as.factor(memdat$id)

size <- read.csv('data/mean_size_ratings.csv')
size <- select(size, -X)
memdat <- left_join(memdat, size, by=c('word1'))


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
  ungroup() %>% 
  Rmisc::normDataWithin('id','acc') %>% 
  mutate(acc = acc) %>% 
  group_by(trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
    acc = mean(acc),
    acc_lower95 = acc-1.96*acc_se,
    acc_upper95 = acc+1.96*acc_se)


# within-subject error bars
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  ungroup() %>%
  Rmisc::summarySEwithin(measurevar='acc',withinvars = 'trial_condition',idvar='id') %>% 
  mutate(acc_lower95 = round(acc-ci,3),
         acc_upper95 = round(acc+ci,3)) 


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

# within-subject error bars
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  ungroup() %>%
  Rmisc::summarySEwithin(measurevar='acc',withinvars = c('trial_condition','listid'),idvar='id') %>% 
  mutate(acc_lower95 = acc-ci,
         acc_upper95 = acc+ci)
  

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
  geom_point(position = position_jitter(width=0.2, height=0), alpha=0.2, size=2) +
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
  ggtitle('Experiment 1')
ggsave('figures/exp1_recall_by_list_and_condition.png', width=6.5, height=3, units='in')

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
  ggtitle('Experiment 1')
ggsave('figures/exp1_studyRTs_by_list_and_condition.png', width=6.5, height=3, units='in')

# effect of prior cue
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(trial_condition, acc, color=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  facet_wrap(~stimulus_condition)
  
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
  ggplot(aes(trial_condition, studyRT, color=cue_prioritem, group=cue_prioritem)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")  +
  scale_y_continuous("Size judgement RTs during study (ms)") +
  scale_x_discrete('Instructions for the current item') +
  scale_color_discrete("Instructions for the\npreceding study item") +
  theme_bw() +
  ggtitle('Experiment 1')
ggsave('figures/exp1_studyRTs_by_current_and_previous_item_instructions.png', width= 5, height=3, units='in')

# cumulative effect of prior cue on RTs
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500, !is.na(cue_prioritem)) %>% 
  ggplot(aes(cue_consec_value, studyRT, color=trial_condition)) +
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
  ggtitle('Experiment 1') +
  theme_bw() +
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank())
ggsave('figures/exp1_acc_f(studyRTs).png', width=4.2, height=3, units='in')

ml1 <- glmer(acc1 ~ listid * trial_condition + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml2 <- glmer(acc1 ~ listid * trial_condition + I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
ml3 <- glmer(acc1 ~ listid * trial_condition + trial_condition*I(studyRT/1000) + (1|id), data=filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500), family='binomial')
summary(ml1)
summary(ml2)

#############################################################################!
# Determine "correct" response for size judgment                         ####
#############################################################################!



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
  filter(stimulus_condition == "words", size_group != 1, listid==3) %>% 
  mutate(size_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(id, trial_condition) %>% 
  summarise(size_acc = mean(size_acc)) %>% 
  group_by(trial_condition) %>% 
  summarise(acc = mean(size_acc),
            acc_se = sd(size_acc)/sqrt(length(size_acc)),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

memdat %>% 
  filter(stimulus_condition == "words", size_group != 1) %>% 
  mutate(size_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  )) %>% 
  group_by(trial_condition, listid) %>% 
  summarise(size_acc = mean(size_acc))
  

#############################################################################!
# BF analysis                                                            ####
#############################################################################!

# main effect of instruction on List 3 accuracy
mldat <- filter(memdat, !exclude, studyRT <= 10000, studyRT >= 500, listid==3)

ml1 <- brm(acc1 ~ 1 + (trial_condition|id), 
           data=mldat, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml2 <- brm(acc1 ~ trial_condition + (trial_condition|id), 
           data=mldat, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
           prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))


bf1_21 <- bayes_factor(ml2, ml1)

samples1 <- posterior_samples(ml2, pars=c('^b'))
quantile(exp(samples1$b_Intercept)/(1+exp(samples1$b_Intercept)), probs=c(0.025,0.5, 0.975))
quantile(exp(samples1$b_Intercept+samples1$b_trial_conditionremember)/(1+exp(samples1$b_Intercept+samples1$b_trial_conditionremember)), probs=c(0.025,0.5, 0.975))


# differences in semantic judgement accuracy
mldat2 <- memdat %>% 
  filter(stimulus_condition == "words", size_group != 1, listid==3) %>% 
  mutate(size_acc = case_when(
    size_group == 0 & resp == "smaller" ~ 1,
    size_group == 2 & resp == "larger" ~ 1,
    TRUE ~ 0
  ))


ml21 <- brm(size_acc ~ 1 + (trial_condition|id), 
           data=mldat2, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml22 <- brm(size_acc ~ trial_condition + (trial_condition|id), 
           data=mldat2, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
           prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))


bf2_21 <- bayes_factor(ml21, ml22)


# RTs by condition
mldat3 <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id,listid, trial_condition, stimulus_condition) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3)


ml31 <- brm(studyRT ~ 1 + (trial_condition|id), 
            data=mldat3, family=, save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml32 <- brm(studyRT ~ trial_condition + (trial_condition|id), 
            data=mldat3, save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)


bf3_21 <- bayes_factor(ml32, ml31)


# accuracy as a function of RTs
mldat4 <- memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  group_by(id, stimulus_condition) %>% 
  mutate(rt = studyRT,
         rt = (rt - mean(rt)),
         rt = ecdf(rt)(rt),
         studyRT = I(studyRT/1000))
         # rt = ceiling(rt*10)/10)

ml42 <- brm(acc1 ~ trial_condition + (trial_condition * rt||id), 
            data=mldat4, family=bernoulli(), save_all_pars = TRUE, iter = 4000, cores = 3, chains = 3, 
            prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))

ml43 <- brm(acc1 ~ trial_condition + studyRT + (1|id), 
           data=mldat4, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
           prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))

ml44 <- brm(acc1 ~ trial_condition * studyRT + (1|id), 
            data=mldat4, family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
            prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))



bf4_32 <- bayes_factor(ml43, ml42)
bf4_43 <- bayes_factor(ml44, ml43)


ml44_1a <- brm(acc1 ~ trial_condition + (1|id), 
               data=filter(mldat4), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml44_2a <- brm(acc1 ~ trial_condition + rt + (1|id), 
               data=filter(mldat4), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
               prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))

ml44_1r <- brm(acc1 ~ 1 + (1|id), 
               data=filter(mldat4, trial_condition == "remember"), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml44_1p <- brm(acc1 ~ 1 + (1|id), 
               data=filter(mldat4, trial_condition == "process"), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3)

ml44_2r <- brm(acc1 ~ rt + (1|id), 
            data=filter(mldat4, trial_condition == "remember"), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
            prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))

ml44_2p <- brm(acc1 ~ rt + (1|id), 
              data=filter(mldat4, trial_condition == "process"), family=bernoulli(), save_all_pars = TRUE, iter = 2000, cores = 3, chains = 3, 
              prior  = set_prior('student_t(3, 0, 2.5)', class = 'b'))

bf4_r <- bayes_factor(ml44_2r, ml44_1r)
bf4_p <- bayes_factor(ml44_2p, ml44_1p)
bf4_a <- bayes_factor(ml44_2a, ml44_1a)
bf4_r
bf4_p
