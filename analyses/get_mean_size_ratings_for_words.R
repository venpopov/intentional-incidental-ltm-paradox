# object size ratings from all experiments

#############################################################################!
# DATA                                                                   ####
#############################################################################!

exp <- list()
for (i in 1:8) {
  exp[[i]] <- read.csv(paste0('data/exp',i,'/preproc_mem_data.csv'))
  exp[[i]]$exp <- i
}

exp <- do.call('bind_rows',exp)

# extract relevant info
exp <- exp %>% 
  filter(stimulus_condition == "words") %>% 
  select(id, listid, study_position, word1, studyRT, resp)
write.csv(exp, 'data/raw_size_ratings.csv', row.names=F)

hist(exp$studyRT[exp$studyRT < 10000])

# aggregate ratings
tmp <- exp %>% 
  filter(studyRT > 900, studyRT < 10000) %>% 
  group_by(word1) %>% 
  mutate(resp = as.numeric(resp=="larger"),
         larger_p = mean(resp))


ggplot(tmp, aes(larger_p)) +
  geom_histogram(fill='lightgrey',color='darkgrey') +
  theme_classic() +
  xlab('P(larger than a football)')
ggsave('figures/size_judgement_histogram.png',width=3, height=3)




# this shows that ratings stabilize after 800ms
tmp %>% 
  filter(studyRT < 2000) %>% 
  mutate(err = abs(resp-larger_p)) %>% 
  ggplot(aes(as.factor(ceiling(studyRT/100)*100), err, group=1)) +
  stat_summary(geom="pointrange") +
  xlab('Size-judgement RTs') +
  ylab('Mean difference in P(larger than a football) relative to full sample') +
  theme_classic() +
  stat_summary(geom="line")
ggsave('figures/size_judgement_rts_error.png', width=8, height=5, units='in')


# this shows RTs as a function of size ratings
exp %>% 
  filter(studyRT > 800, studyRT < 5500) %>% 
  group_by(word1) %>% 
  summarize(larger_p = ceiling(mean(resp=="larger")*10)/10,
            sizeRT = median(studyRT)) %>% 
  arrange(desc(larger_p)) %>%
  ggplot(aes(larger_p, sizeRT)) +
  stat_summary(geom="pointrange")
  
  
ratings <- exp %>% 
  filter(studyRT > 800, studyRT < 5500) %>% 
  group_by(word1) %>% 
  summarize(larger_p = round(mean(resp=="larger"),2),
            sizeRT = median(studyRT)) %>% 
  mutate(size_group = case_when(
    larger_p <= 0.2 ~ 0,
    larger_p >= 0.8 ~ 2,
    TRUE ~ 1))

write.csv(ratings, 'data/mean_size_ratings.csv')
            