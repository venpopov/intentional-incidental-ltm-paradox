library(tidyverse)

dat <- read.csv('data/exp15/preproc_recog_data.csv')
dat <- mutate(dat, trial_condition = ifelse(is.na(trial_condition), "new", trial_condition))

# check for inverted responses. 8 is at chance. several subjects flipped the buttons
check <- dat %>% 
  group_by(id, test_trial_type) %>% 
  summarise(resp = mean(response)) %>% 
  spread(test_trial_type, resp) %>% 
  mutate(diff = old-new) %>% 
  arrange(diff) %>% 
  print()

flipped_ids <- filter(check, diff < 0)$id
dat <- dat %>% 
  mutate(response = ifelse(id %in% flipped_ids, 7-response, response)) %>% 
  filter(!(id %in% c(8)))

# post-experiment questionnaire responses
dat %>% 
  select(id, expect_test, use_help, recall_all_q) %>% 
  unique() %>% 
  count(expect_test, use_help, recall_all_q)

# remove people who expected the test, used help or did not try to recall all items
dat <- filter(dat, expect_test == "No", use_help == "No")


#############################################################################!
# GROUPED ROCS (NO AGE)                                                           ####
#############################################################################!

roc_dat <- dat %>% 
  mutate(trial_condition = ifelse(is.na(trial_condition), "new", trial_condition)) %>% 
  group_by(trial_condition, response) %>% 
  count() %>% 
  group_by(trial_condition) %>% 
  mutate(p = n/sum(n)) %>% 
  arrange(trial_condition, desc(response)) %>% 
  mutate(p_cum = cumsum(p))

p_fa <- filter(roc_dat, trial_condition == "new") %>% ungroup() %>%  select(p_cum, response) %>% rename(p_fa = p_cum)
roc_dat <- filter(roc_dat, trial_condition != "new") %>% 
  left_join(p_fa) %>% 
  filter(response != 1)

ggplot(roc_dat, aes(p_fa, p_cum, color=trial_condition)) +
  geom_point() +
  geom_line() +
  coord_cartesian(ylim=c(0,1), xlim=c(0,1)) +
  geom_abline(intercept=0, slope=1) +
  theme_classic() +
  scale_x_continuous('Probability of false alarms') +
  scale_y_continuous('Probability of hits') +
  scale_color_discrete('Item type') +
  theme(legend.position=c(1,0.1), legend.justification = c(1,0))  +
  ggtitle('Expect recall test')
ggsave('figures/reply_figure1.png', width=3, height=3, units='in')

ggplot(roc_dat, aes(qnorm(p_fa), qnorm(p_cum), color=trial_condition)) +
  geom_point() +
  geom_line() +
  coord_cartesian(ylim=c(-2,2), xlim=c(-2,2)) +
  geom_abline(intercept=0, slope=1) +
  theme_classic() +
  scale_x_continuous('Probability of false alarms') +
  scale_y_continuous('Probability of hits')

ggplot(roc_dat, aes(qnorm(p_fa), qnorm(p_cum), color=trial_condition, shape=age, linetype=age)) +
  geom_point() +
  geom_line() +
  coord_cartesian(ylim=c(-2,2), xlim=c(-2,2)) +
  geom_abline(intercept=0, slope=1)

#############################################################################!
# FIT 2process measurement model                                         ####
#############################################################################!

fit_2p_model <- function(data) {
  function(par) {
    d <- par[1]
    ro <- par[2]
    Cs <- par[3:7]
    pred_hits <- ro + (1-ro)*pnorm(Cs,-d, 1)
    pred_fas <- (1-0.001)*pnorm(Cs,0,1)
    sse <- sqrt(mean((data$p_cum-pred_hits)**2+(data$p_fa-pred_fas)**2))
    sse
  }
}

extract_model <- function(data) {
  fit <- optim(c(0.452184,0.424,-1.71,-0.83,-0.22, 0.237, 0.808), fit_2p_model(data), lower=c(0.001,0.001,-Inf,-Inf,-Inf,-Inf,-Inf), method="L-BFGS-B")
  data.frame(par=c('d','ro','c1','c2','c3','c4','c5','conv','sse'), value=c(fit$par, fit$convergence, fit$value))
}

roc_dat %>% 
  group_by(trial_condition) %>% 
  do({extract_model(.)}) %>% 
  spread(par, value)

