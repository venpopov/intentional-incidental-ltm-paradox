exp1 <- read.csv('data/exp1/preproc_mem_data.csv')
exp2 <- read.csv('data/exp2/preproc_mem_data.csv')

exp1 <- mutate(exp1, exp=1)
exp2 <- mutate(exp2, exp=2)
memdat_joint <- bind_rows(exp1,exp2)

# studyRTs by exp
memdat_joint %>% 
  filter(use_help == "No" & expect_test == "No", studyRT >= 500, studyRT <= 10000) %>% 
  ggplot(aes(listid, studyRT, color=trial_condition)) +
  stat_summary() +
  coord_cartesian(ylim = c(0,2850)) +
  facet_wrap(~exp) +
  stat_summary(geom="line")


table(filter(memdat, stimulus_condition == "words")$word1)

ratings <- memdat %>% 
  filter(stimulus_condition == "words") %>% 
  group_by(word1) %>% 
  summarise(larger_prop = mean(resp == "larger"))

ratings$larger_prop %>% hist()


ratings_cond <- memdat %>% 
  filter(stimulus_condition == "words") %>% 
  group_by(word1, trial_condition) %>% 
  summarise(larger_prop = mean(resp == "larger")) %>% 
  spread(trial_condition, larger_prop)

ggplot(ratings_cond, aes(process, remember)) +
  geom_point()

hist(ratings_cond$process)
hist(ratings_cond$remember)

memdat %>% 
  filter(trial_condition == "remember") %>% 
  group_by(use_help, id) %>% 
  summarise(acc = mean(acc)) %>% 
  ggplot(aes(use_help, acc)) +
  geom_point(position=position_jitter(width=0.1), alpha=0.3) +
  stat_summary(geom="pointrange", color='red')
  
memdat %>% 
  filter(trial_condition == "remember") %>% 
  group_by(use_help, id, listid) %>% 
  summarise(acc = mean(acc)) %>% 
  ggplot(aes(use_help, acc)) +
  geom_point(position=position_jitter(width=0.1), alpha=0.3) +
  stat_summary(geom="pointrange", color='red') +
  facet_wrap(~listid)
