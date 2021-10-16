library(tidyverse)
library(lme4)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp10/preproc_mem_data.csv')
memdat2 <- read.csv('data/exp10/preproc_mem_data_cue_test.csv')
mathdat <- read.csv('data/exp10/preproc_math_data.csv')
memdat3 <- read.csv('data/exp10/preproc_memdat3.csv')

# number of included participants
memdat %>% select(id, use_help, expect_test) %>% unique() 

memdat %>% 
  group_by(id) %>% 
  mutate(overall_acc = mean(acc)) %>% 
  mutate(exclude = use_help == "Yes" | expect_test == "yes" | overall_acc == 0)


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

filter(memdat, !exclude)$id %>% unique() %>% length()

memdat2 %>% 
  group_by(id) %>%  
  summarise(overall_acc = mean(acc)) %>% 
  arrange(overall_acc) %>% 
  print(n=200)

memdat2 <- memdat2 %>% 
  group_by(id) %>%  
  mutate(overall_acc = mean(acc)) %>% 
  mutate(exclude = use_help == "Yes" | expect_test == "yes" | overall_acc == 0)

filter(memdat2, !exclude)$id %>% unique() %>% length()

memdat2 %>% 
  group_by(id) %>%  
  mutate(overall_acc = mean(acc),
         bad_acc = overall_acc == 0) %>% 
  mutate(exclude = use_help == "Yes" | expect_test == "yes" | overall_acc == 0) %>% 
  select(id, use_help, expect_test, bad_acc) %>% 
  unique() %>% 
  ungroup() %>% 
  count(use_help, expect_test,bad_acc)


#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# listid and trial_condition on acc
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  filter(study_position %% 2 == 1) %>%
  group_by(id, trial_condition, listid) %>% 
  summarise(acc = mean(acc)) %>% 
  ggplot(aes(listid, acc, color=trial_condition)) +
  geom_point(position = position_jitter(width=0.2), alpha=0.2, size=2) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,1)) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Free (List1) or Cued (List2) recall probability", breaks=seq(0,1,0.1)) +
  scale_color_discrete("Item instructions", labels=c("Process only","Remember")) +
  scale_fill_discrete("Item instructions", labels=c("Process only","Remember")) +
  ggtitle('Experiment 7')
ggsave('figures/exp7_acc_listid_trialcondition.png',width=5, height=3.5, units='in')
  
mldat <- memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000) %>% 
  filter(study_position %% 2 == 1)
glmer(acc ~ trial_condition*listid + (1|id), data=mldat, family="binomial") %>% summary()

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
  stat_summary(geom="line")

memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=cue_prioritem, shape=as.factor(listid), linetype=as.factor(listid))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

memdat %>% 
  filter(!exclude, studyRT > 500, studyRT <= 10000, !is.na(cue_prioritem)) %>% 
  ggplot(aes(size_diff, as.numeric(resp == "larger"), color=as.factor(study_position))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")

glmer(as.numeric(resp=="larger") ~ size_diff * cue_prioritem + (1|id), family="binomial", data=filter(memdat, !exclude, studyRT > 500, studyRT <= 10000)) %>% summary()


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
  ggtitle('Experiment 7 - size ratings performance')
ggsave('figures/exp7_size_judgements_performance_by_list.png',width=7, height=5, units='in')



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
  geom_smooth() +
  facet_wrap(~listid)


#############################################################################!
# TEST2                                                                  ####
#############################################################################!

memdat2 %>% 
  filter(!exclude) %>% 
  ggplot(aes(trial_condition, acc1)) +
  stat_summary(geom="pointrange")

memdat2 %>% 
  filter(!exclude) %>% 
  ggplot(aes(trial_condition, acc2)) +
  stat_summary(geom="pointrange")


memdat2 %>% 
  filter(!exclude) %>% 
  ggplot(aes(trial_condition, acc1, color=cue_prioritem)) +
  stat_summary(geom="pointrange")

memdat2 %>% 
  filter(!exclude) %>% 
  ggplot(aes(trial_condition, acc2, color=cue_postitem)) +
  stat_summary(geom="pointrange")

memdat_prior <- memdat2 %>% 
  filter(!exclude) %>% 
  select(id, trial_condition, cue_prioritem, acc1, test1RT, cue_postitem)

memdat_post <-  memdat2 %>% 
  filter(!exclude) %>% 
  select(id, trial_condition, cue_postitem, acc2, test2RT, cue_prioritem)

names(memdat_prior) <- c('id','cue_condition','target_condition','acc', 'testRT', 'cue_othertarget')
names(memdat_post) <- c('id','cue_condition','target_condition','acc', 'testRT','cue_othertarget')

memdat_test2 <- bind_rows(memdat_prior, memdat_post) 

# key plot
memdat_test2 %>% 
  ggplot(aes(cue_condition, acc, color=target_condition, group=target_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  scale_x_discrete('Memory instructions for the cue') +
  scale_y_continuous('Cued recall probability') +
  scale_color_discrete('Memory instructions\nfor the target') +
  theme_bw() +
  ggtitle('Experiment 7')
ggsave('figures/exp7_acc_cuetype_targettype.png', width=5, height=3.5, units='in')

# key plot
memdat_test2 %>% 
  ggplot(aes(cue_othertarget, acc, color=target_condition, group=target_condition)) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")


glmer(acc ~ cue_condition + target_condition + (1|id), data=memdat_test2, family = "binomial") %>% summary()
glmer(acc ~ cue_condition*target_condition + (1|id), data=memdat_test2, family = "binomial") %>% summary()


#############################################################################!
# memory for one of the targets depending on the cue to the other        ####
#############################################################################!


  


#############################################################################!
#                                                                        ####
#############################################################################!

memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  group_by(id) %>% 
  mutate(resp_type = case_when(
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==2)$word1 ~ "intrusion",
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==1)$word1 ~ "list1 intrusion",
    typed_word == word_prioritem ~ "backward correct",
    typed_word == word_postitem ~ "forward correct",
    typed_word == "" ~ "no response")) %>% 
  count(resp_type) %>% 
  mutate(p = n/sum(n)) %>% 
  filter(!is.na(resp_type)) %>% 
  ggplot(aes(resp_type, p)) +
  stat_summary(geom="pointrange") +
  coord_cartesian(ylim=c(0,0.6))


memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  group_by(id) %>% 
  mutate(resp_type = case_when(
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==2)$word1 ~ "intrusion",
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==1)$word1 ~ "list1 intrusion",
    typed_word == word_prioritem ~ "backward correct",
    typed_word == word_postitem ~ "forward correct",
    typed_word == "" ~ "no response")) %>% 
  count(resp_type, cue_output_order) %>% 
  mutate(p = n/sum(n)) %>% 
  group_by(resp_type, cue_output_order) %>% 
  summarise(p = mean(p))



memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  group_by(id) %>% 
  # ungroup() %>% 
  mutate(typed_word = typed_word[sample(length(typed_word))]) %>% 
  mutate(resp_type = case_when(
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% memdat$word1 ~ "intrusion",
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==1)$word1 ~ "list1 intrusion",
    typed_word == word_prioritem ~ "backward correct",
    typed_word == word_postitem ~ "forward correct",
    typed_word == "" ~ "no response")) %>% 
  count(resp_type) %>% 
  mutate(p = n/sum(n)) %>% 
  group_by(resp_type) %>% 
  summarise(p = mean(p))


memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  group_by(id) %>% 
  # ungroup() %>% 
  # mutate(typed_word = typed_word[sample(length(typed_word))]) %>% 
  mutate(resp_type = case_when(
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% memdat$word1 ~ "intrusion",
    typed_word != word_prioritem & typed_word != word_postitem & typed_word != "" & typed_word %in% filter(memdat, id==id, listid==1)$word1 ~ "list1 intrusion",
    typed_word == word_prioritem ~ "backward correct",
    typed_word == word_postitem ~ "forward correct",
    typed_word == "" ~ "no response")) %>% 
  count(resp_type) %>% 
  mutate(p = n/sum(n)) %>% 
  group_by(resp_type) %>% 
  summarise(p = mean(p))

#############################################################################!
#                                                                        ####
#############################################################################!

memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  mutate(resp_lag = resp_study_position-cue_study_position) %>% 
  ungroup() %>% 
  count(id, resp_lag) %>% 
  complete(id, resp_lag, fill=list(n=0)) %>% 
  group_by(id) %>% 
  mutate(p = n/sum(n)) %>% 
  ggplot(aes(resp_lag, p, group=as.factor(resp_lag>0))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line") +
  coord_cartesian(ylim=c(0,0.1))

shuffled <- data.frame()
for (i in 1:100) {
  tmp <- memdat3 %>% 
    filter(!(cue_output_order > 2)) %>%   
    group_by(id) %>% 
    mutate(resp_study_position = resp_study_position[sample(length(resp_study_position))]) %>% 
    mutate(resp_lag = resp_study_position-cue_study_position) %>% 
    ungroup() %>% 
    count(id, resp_lag) %>% 
    complete(id, resp_lag, fill=list(n=0)) %>% 
    group_by(id) %>% 
    mutate(p = n/sum(n))
  shuffled <- bind_rows(shuffled,tmp)
}

shuffled <- shuffled %>% 
  group_by(id,resp_lag) %>% 
  summarise(p = mean(p))

shuffled %>% 
  ggplot(aes(resp_lag, p, group=as.factor(resp_lag>0))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")  +
  coord_cartesian(ylim=c(0,0.1))

# key plot
memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  mutate(resp_lag = resp_study_position-cue_study_position) %>% 
  ungroup() %>% 
  count(id, resp_lag) %>% 
  complete(id, resp_lag, fill=list(n=0)) %>% 
  group_by(id) %>% 
  mutate(p = n/sum(n)) %>% 
  left_join(shuffled, by=c('id','resp_lag')) %>% 
  mutate(p = p.x-p.y) %>% 
  ggplot(aes(resp_lag, p, group=as.factor(resp_lag>0))) +
  stat_summary(geom="pointrange") +
  stat_summary(geom="line")


memdat3 %>% 
  filter(!(cue_output_order > 2)) %>% 
  mutate(resp_lag = resp_study_position-cue_study_position) %>% 
  ungroup() %>% 
  count(id, cue_condition, resp_lag) %>% 
  complete(id, cue_condition, resp_lag, fill=list(n=0)) %>% 
  group_by(id, cue_condition) %>% 
  mutate(p = n/sum(n)) %>% 
  ggplot(aes(resp_lag, p, color=cue_condition)) +
  stat_summary(geom="pointrange")
