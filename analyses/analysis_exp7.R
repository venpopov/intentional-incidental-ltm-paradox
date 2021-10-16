library(tidyverse)
library(lme4)
library(patchwork)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp7/preproc_mem_data.csv')
mathdat <- read.csv('data/exp7/preproc_math_data.csv')
memdat <- memdat %>% 
  mutate(expect_test = ifelse(is.na(expect_test), "No", expect_test))


memdat <- memdat %>% 
  mutate(id = as.factor(id),
         exclude = use_help == "Yes" | expect_test == "yes")

mathdat <- mathdat %>% 
  mutate(id = as.factor(id))

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
memdat %>% 
  group_by(id) %>% 
  summarise(acc = mean(acc)) %>% 
  arrange(acc) %>% 
  print(n=100)


memdat %>% 
  select(id, btw_cond, use_help, expect_test) %>% 
  unique() %>% 
  count(use_help, expect_test)

memdat %>% 
  filter(!exclude) %>% 
  select(id, btw_cond, use_help, expect_test) %>% 
  unique() %>% 
  count(btw_cond, use_help, expect_test)



#############################################################################!
# PLOTS                                                                  ####
#############################################################################!

# table of accuracy per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, btw_cond,trial_condition) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(btw_cond, listid, trial_condition) %>% 
  summarise(acc = mean(acc) %>% round(2)) %>% 
  spread(trial_condition, acc) %>% 
  mutate(total = (process+remember)/2)


# overall accuracy per instruction and list
memdat %>% 
  filter(!exclude, btw_cond != "remember_6") %>% 
  group_by(id,listid, btw_cond) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(listid, btw_cond) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

# overall accuracy per instruction and list, excluding perfect participants
memdat %>% 
  filter(!exclude, btw_cond != "remember_6", !(btw_cond == "process_all" & listid != 3)) %>% 
  group_by(id, btw_cond) %>% 
  summarise(acc = mean(acc)) %>% 
  group_by(btw_cond) %>% 
  summarise(acc_se = sd(acc)/sqrt(length(acc)),
            acc = mean(acc),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)


# overall RTs per instruction
memdat %>% 
  filter(!exclude, studyRT <= 10000, studyRT >= 500) %>% 
  filter(!exclude, btw_cond != "remember_6") %>% 
  group_by(id,listid, btw_cond) %>% 
  mutate(rel_to_med = abs(studyRT-median(studyRT))/mad(studyRT)) %>% 
  filter(rel_to_med <= 3) %>% 
  group_by(trial_condition) %>% 
  mutate(rt = studyRT) %>% 
  summarise(rt_se = sd(rt)/sqrt(length(rt)),
            rt = mean(rt),
            rt_lower95 = rt-1.96*rt_se,
            rt_upper95 = rt+1.96*rt_se)

# table of counts per condition
memdat %>% 
  filter(!exclude) %>% 
  group_by(id, listid, btw_cond,trial_condition) %>% 
  summarise(n = sum(acc)) %>% 
  group_by(btw_cond, listid, trial_condition) %>% 
  summarise(n = mean(n)) %>% 
  spread(trial_condition, n) %>% 
  mutate(total = process+remember)

# main effect of instruction and list, split by stim type
f1 <- memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, btw_cond != "remember_6", !(btw_cond == "process_all" & listid != 3)) %>% 
  group_by(id,listid, btw_cond) %>% 
  summarise(acc = mean(acc)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_acc = mean(acc)) %>%
  # group_by(id) %>%
  # mutate(acc = acc-mean(acc)+overall_acc) %>%
  ggplot(aes(listid, acc, fill=btw_cond, color=btw_cond, label=acc)) +
  geom_point(position = position_jitter(width=0.2, height=0), alpha=0.2, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Free recall probability") +
  scale_color_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  scale_fill_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  ggtitle('Experiment 9')
f1
ggsave('figures/exp9_recall_by_list_and_condition.png', width=5.5, height=4.5, units='in')


# main effect of instruction and list, split by stim type
f2 <- memdat %>% 
  filter(studyRT >= 500, studyRT <= 10000, btw_cond != "remember_6") %>% 
  # group_by(id,listid, btw_cond) %>%
  # summarise(studyRT = mean(studyRT)) %>% 
  # group_by(stimulus_condition) %>%
  # mutate(overall_acc = mean(acc)) %>%
  # group_by(id) %>%
  # mutate(acc = acc-mean(acc)+overall_acc) %>%
  ggplot(aes(listid, studyRT, fill=btw_cond, color=btw_cond, label=studyRT)) +
  # geom_point(position = position_jitter(width=0.2), alpha=0.2, size=2) +
  stat_summary(geom="line") +
  stat_summary(color='black', shape=21) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("List number", breaks=c(1,2,3)) +
  scale_y_continuous("Size judgement RTs") +
  scale_color_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  scale_fill_discrete("Group instructions", labels=c("\nProcess only\n(Incidental learning group)","\nRemember\n(Intentional learning group)")) +
  ggtitle('Experiment 9')
f2 
ggsave('figures/exp9_studyRTs_by_list_and_condition.png', width=5.5, height=4, units='in')

f1+theme(legend.position="none")+f2

ggsave('figures/exp9_acc_rt_listid_group.png', width=6.5, height=2.5, units='in')


# effect of studyRTs on accuracy
memdat %>% 
  filter(!exclude, studyRT >= 500, studyRT <= 10000, btw_cond != "remember_6", !(btw_cond == "process_all" & listid != 3)) %>%
  group_by(id, btw_cond) %>% 
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


#############################################################################!
# ADDITIONAL PLOTS                                                       ####
#############################################################################!

subdat1 <- filter(memdat, !(listid != 3 & btw_cond == 'process_all'), !(listid != 3 & btw_cond == "remember_all"), btw_cond != "remember_6", !exclude)

subdat1 %>% 
  ggplot(aes(study_position, acc, color=btw_cond)) +
  stat_summary(geom="pointrange") +
  facet_wrap(~btw_cond) +
  stat_smooth() +
  coord_cartesian(ylim=c(0,1)) +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  scale_x_continuous("Serial position") +
  scale_y_continuous('Free recall probability') +
  scale_color_discrete('Between-subject\nmemory instructions', labels=c("Process only", "Remember")) +
  ggtitle('Experiment 7')
  
ggsave('figures/exp7_acc_serial_position.png', width=7.5, height=4, units='in')
  

  
#############################################################################!
# Contiguity effects                                                     ####
#############################################################################!

subdat <- filter(memdat, !exclude, listid == 3, btw_cond != "remember_6", acc == 1) %>% 
  arrange(id, output_pos1) %>% 
  select(id, study_position, btw_cond, presented_color, word1, studyRT, resp, output_pos1, testRT1, acc) %>% 
  group_by(id) %>% 
  mutate(next_lag = c(study_position[-1],NA)-study_position)

subdat <- subdat %>%
  ungroup() %>%
  count(id, btw_cond, next_lag)

expand_grid(next_lag = (-29):29, id = unique(subdat$id)) %>% 
  filter(next_lag != 0) %>% 
  left_join(subdat, by=c('id','next_lag')) %>% 
  arrange(id, next_lag) %>% 
  mutate(n = ifelse(is.na(n),0,n)) %>% 
  group_by(id) %>% 
  mutate(btw_cond = unique(btw_cond)[2]) %>% 
  mutate(p = n/sum(n)) %>% 
  filter(!is.na(btw_cond)) %>% 
  ggplot(aes(next_lag,p, color=btw_cond, group=interaction(btw_cond, as.factor(next_lag >0)))) +
  stat_summary(geom="pointrange") +
  geom_smooth()
  

#####
subdat <- filter(memdat, !exclude, listid == 3, btw_cond != "remember_6", acc == 1) %>% 
  arrange(id, output_pos1) %>% 
  select(id, study_position, btw_cond, presented_color, word1, studyRT, resp, output_pos1, testRT1, acc)
  
recmat <- subdat %>% 
  select(id, btw_cond, study_position, output_pos1) %>% 
  group_by(id) %>% 
  mutate(output_pos1 = 1:length(output_pos1)) %>% 
  spread(output_pos1, study_position)

rvec <- NA
rmat <- NA
for (r in 1:nrow(recmat)) {
  for (i in 3:13) {
    for (j in 1:30) {
      if (!(j %in% recmat[r,3:i])) {
        tmp <- as.numeric(j-recmat[r,i])
        rvec <- c(rvec, tmp)
      }
    }
  }
  rmat <- rbind(rmat,rvec)
  rvec <- NA
}
rmat <- rmat[-1,]

posibmat <- as.matrix(rmat)
postrans <- apply(posibmat,1,function(x) as.data.frame(table(x)))

for (i in 1:length(postrans)) {
  if (nrow(postrans[[i]]>0))
  postrans[[i]]$id <- recmat$id[i]
}

postrans <- do.call("bind_rows", postrans)
postrans$x <- as.numeric(as.character(postrans$x))

subdat <- filter(memdat, !exclude, listid == 3, btw_cond != "remember_6", acc == 1) %>% 
  arrange(id, output_pos1) %>% 
  select(id, study_position, btw_cond, presented_color, word1, studyRT, resp, output_pos1, testRT1, acc) %>% 
  group_by(id) %>% 
  mutate(next_lag = c(study_position[-1],NA)-study_position)

subdat <- subdat %>%
  ungroup() %>%
  count(id, btw_cond, next_lag)

a <- left_join(postrans, subdat, by=c('id','x'='next_lag'))
head(a)
a <- a %>% 
  group_by(id) %>% 
  mutate(nmean = mean(is.na(n))) %>% 
  filter(nmean < 1) %>% 
  mutate(n = ifelse(is.na(n), 0, n)) %>% 
  mutate(btw_cond = unique(btw_cond)[!is.na(unique(btw_cond))])

a <- a %>% 
  group_by(id, x, btw_cond) %>% 
  summarise(freq = sum(Freq),
            n = sum(n),
            p = n/freq)

a %>% 
  ungroup() %>% 
  Rmisc::normDataWithin('id','p','btw_cond') %>% 
  filter(x < 6, x > -6, x!=0) %>% 
  ggplot(aes(x, pNormed, color=btw_cond, group=interaction(btw_cond, as.factor(x >0)))) +
  stat_summary(geom="pointrange") +
  # stat_smooth(se=F) +
  stat_summary(geom="line")


#############################################################################!
# COMPARE INTRUSIONS                                                     ####
#############################################################################!

# get this from preproc script
test %>% 
  filter(listid == 3) %>% 
  left_join(select(filter(study, listid==3), id, presented_word1,duration), by=c('id','typed_word' = 'presented_word1')) %>% 
  mutate(resp_type = ifelse(is.na(duration.y), 'intrusion','target')) %>% 
  ungroup() %>% 
  count(id, btw_cond, resp_type) %>% 
  ungroup() %>% 
  complete(id, resp_type, fill=list(n=0)) %>% 
  group_by(id) %>% 
  mutate(btw_cond = unique(btw_cond)[!is.na(unique(btw_cond))]) %>% 
  group_by(btw_cond, resp_type) %>% 
  summarise(n = mean(n))


tmp <- test %>% 
  filter(listid == 3) %>% 
  left_join(select(filter(study, listid==3), id, presented_word1,duration), by=c('id','typed_word' = 'presented_word1')) %>% 
  mutate(resp_type = ifelse(is.na(duration.y), 'intrusion','target')) %>% 
  ungroup() %>% 
  count(id, btw_cond, resp_type) %>% 
  ungroup() %>% 
  complete(id, resp_type, fill=list(n=0)) %>% 
  group_by(id) %>% 
  mutate(btw_cond = unique(btw_cond)[!is.na(unique(btw_cond))]) %>% 
  filter(btw_cond != "remember_6") %>% 
  # select(-listid) %>% 
  filter(resp_type == "intrusion")


glm(n ~ btw_cond, data=tmp, family="poisson") %>% summary()
