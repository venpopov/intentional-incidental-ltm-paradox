library(tidyverse)
library(lme4)
library(patchwork)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat11 <- read.csv('data/exp11_corrected/preproc_mem_data.csv')
mathdat11 <- read.csv('data/exp11_corrected/preproc_math_data.csv')

memdat12 <- read.csv('data/exp12/preproc_mem_data.csv')
mathdat12 <- read.csv('data/exp12/preproc_math_data.csv')

memdat11 <- memdat11 %>% 
  mutate(exp = 11,
         list_type = "Mixed lists")
memdat12 <- memdat12 %>% 
  mutate(trial_condition = btw_cond,
         trial_condition = ifelse(trial_condition == "process_all", "process","remember"),
         list_type = "Pure lists",
         exp = 12)

memdat <- bind_rows(memdat11, memdat12)

memdat$id <- as.factor(memdat$id)

length(unique(memdat$id))

memdat %>% 
  select(id, use_help, expect_test, list_type) %>% 
  unique() %>% 
  count(use_help, expect_test)

memdat %>% 
  filter(!exclude) %>% 
  select(id, list_type, btw_cond) %>% 
  unique() %>% 
  count(list_type, btw_cond)

#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid == 2) %>% 
  group_by(id,list_type, trial_condition) %>% 
  summarise(acc = mean(recall_acc)) %>% 
  group_by(list_type,trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)



# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid == 2) %>% 
  group_by(id) %>% 
  summarise(acc = mean(loc_acc)) %>% 
  ungroup() %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)


# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid == 2) %>% 
  group_by(id,list_type, trial_condition) %>% 
  summarise(acc = mean(loc_acc)) %>% 
  group_by(list_type,trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid == 2) %>% 
  group_by(id,trial_condition) %>% 
  summarise(acc = mean(loc_acc)) %>% 
  group_by(trial_condition) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)


# recall acc
(f1 <- memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, listid == 2) %>% 
  group_by(id,list_type, trial_condition) %>% 
  summarise(recall_acc = mean(recall_acc)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_recall_acc = mean(recall_acc)) %>%
  # group_by(id) %>%
  # mutate(recall_acc = recall_acc-mean(recall_acc)+overall_recall_acc) %>%
  ggplot(aes(list_type, recall_acc, fill=trial_condition, color=trial_condition, label=recall_acc, group=trial_condition)) +
  geom_point(position = position_jitter(width=0.2, height=0), alpha=0.1, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_discrete("", labels=c('Mixed lists\n(within-subject)','Pure lists\n(between-subject)')) +
  scale_color_discrete("Memory instructions", labels=c('Process-only', 'Remember')) +
  scale_fill_discrete("Memory instructions", labels=c('Process-only', 'Remember')) +
  scale_y_continuous("Free recall probability") +
  coord_cartesian(ylim=c(0,1)) +
  ggtitle('Experiment 10 - Free recall'))



glmer(recall_acc ~ 0 + list_type + list_type:trial_condition + (1|id), data=filter(memdat, !exclude, studyRT >= 500, studyRT <= 10000, listid == 2), family="binomial") %>% summary()

glmer(recall_acc ~ list_type  * trial_condition + (1|id), data=filter(memdat, !exclude, studyRT >= 500, studyRT <= 10000, listid == 2), family="binomial") %>% summary()


# location acc
(f2 <- memdat %>% 
  filter(loc_rt > 500, !exclude) %>%
  filter(!exclude, listid==2) %>% 
  ungroup() %>% 
  # group_by(btw_cond) %>%
  # mutate(overall_loc_acc = mean(loc_acc)) %>%
  # group_by(id) %>%
  # mutate(loc_acc = loc_acc - mean(loc_acc) + overall_loc_acc) %>%
  group_by(id, list_type, trial_condition) %>%
  summarise(loc_acc = mean(loc_acc)) %>%
  ggplot(aes(list_type, loc_acc, color=trial_condition, fill=trial_condition, group = trial_condition)) +
  # geom_point(position = position_jitter(width=0.2), alpha=0.2, size=1.5) +
    geom_point(position = position_jitter(width=0.2, height=0), alpha=0.1, size=2) +
  stat_summary(geom="line") +
  stat_summary(geom="errorbar", width=0.05) +
  stat_summary(color='black', shape=21, size=0.5) +
  theme_bw() +
  coord_cartesian(ylim=c(0,1)) +
  scale_x_discrete("", labels=c('Mixed lists\n(within-subject)','Pure lists\n(between-subject)')) +
  scale_y_continuous('Source memory accuracy') +
  scale_color_discrete("Memory instructions", labels=c('Process-only', 'Remember')) +
  scale_fill_discrete("Memory instructions", labels=c('Process-only', 'Remember')) +
  ggtitle('Experiment 10 - Source memory') +
  geom_hline(yintercept = 0.25, linetype='dashed')) +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank())

glmer(loc_acc ~ list_type + trial_condition + (1|id), data= filter(memdat, !exclude, listid==2, loc_rt > 500), family="binomial") %>% summary()
glmer(loc_acc ~ list_type * trial_condition + (1|id), data= filter(memdat, !exclude, listid==2, loc_rt > 500), family="binomial") %>% summary()


f1+theme(legend.position="none") + f2
ggsave('figures/exp11_12_free_recall_source_memory.png', width=7.5, height=3.1, units='in')


memdat %>% 
  filter(listid==2, !exclude) %>% 
  group_by(id) %>% 
  summarise(recall = mean(recall_acc),
            source = mean(loc_acc)) %>% 
  ggplot(aes(recall, source)) +
  stat_summary(geom="pointrange") +
  geom_smooth(method='lm')


memdat %>% 
  filter(listid==2, !exclude) %>% 
  group_by(id, list_type, trial_condition) %>% 
  summarise(recall = mean(recall_acc),
            source = mean(loc_acc)) %>% 
  ggplot(aes(recall, source, color=interaction(list_type,trial_condition))) +
  stat_summary(geom="pointrange") +
  geom_smooth(method='lm', se=F)


memdat %>% 
  filter(studyRT >= 500, studyRT <= 10000, !exclude, listid==2) %>% 
  # group_by(id,listid, btw_cond) %>%
  # summarise(studyRT = mean(studyRT)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_acc = mean(acc)) %>%
  # group_by(id) %>%
  # mutate(acc = acc-mean(acc)+overall_acc) %>%
  ggplot(aes(list_type, studyRT, fill=trial_condition, color=trial_condition, label=studyRT)) +
  # geom_point(position = position_jitter(width=0.2), alpha=0.2, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  # scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Size judgement RTs") +
  # scale_color_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  # scale_fill_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  ggtitle('Experiment 6')
