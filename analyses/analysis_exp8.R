library(tidyverse)
library(lme4)
library(patchwork)

#############################################################################!
# DATA                                                                   ####
#############################################################################!

memdat <- read.csv('data/exp8/preproc_mem_data.csv')
mathdat <- read.csv('data/exp8/preproc_math_data.csv')
testdat <- read.csv('data/exp8/preproc_test_data.csv')

# number of included participants
memdat %>% select(id, use_help, test_first) %>% unique()
memdat %>% select(id, use_help, test_first,color_condition) %>% unique() %>% ungroup() %>%  count(use_help, test_first)

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
  mutate(exclude = use_help == "Yes" | overall_acc == 0)

# change order of blue and red for legend
memdat <- memdat %>% 
  mutate(presented_color = ifelse(presented_color == "red"," red","blue"))

# recode test and color to show accuracy in the first tested color and the second tested color
memdat <- memdat %>% 
  mutate(test_pos = ifelse(test_first == presented_color, "First tested color","Second tested color"),
         test_pos = ifelse(test_first == "all", "Both tested together",test_pos))

# exclude participants with high max studyRT
memdat %>% 
  group_by(id) %>% 
  summarise(maxrt = max(studyRT)) %>% 
  arrange(desc(maxrt)) %>% 
  print(n=100)
memdat <- memdat %>% 
  group_by(id) %>% 
  mutate(maxrt = max(studyRT))



#############################################################################!
# PLTOS                                                                  ####
#############################################################################!

# memory as a function of math_acc
memdat %>% 
  ggplot(aes(math_acc, acc)) +
  stat_summary(geom="pointrange")



# number of recalled items from the test
(f1 <- memdat %>% 
  filter(!exclude,!is.na(testid)) %>% 
  group_by(id, test_first) %>% 
  summarise(n = max(abs_output_position, na.rm=T)/30) %>% 
  ggplot(aes(test_first,n)) +
  # stat_summary(geom="col", width=0.5, fill="lightgrey", color='black') +
  stat_summary(geom="pointrange") +
  stat_summary(geom="errorbar", width=0.15) + 
  # coord_cartesian(ylim=c(0,1)) +
  scale_y_continuous('Overall free recall probability') +
  coord_cartesian(ylim=c(0,0.4)) +
  scale_x_discrete("Color of first test") +
  theme_bw() +
  theme(panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()) +
  ggtitle("Experiment 5"))
ggsave('figures/exp5_overall_acc.png',width=3.5, height=3.5, units='in')


(f1 <- memdat %>% 
    filter(!exclude) %>%
    group_by(id, test_first) %>% 
    summarise(acc = mean(acc)) %>% 
    # Rmisc::normDataWithin('id','acc', betweenvars = "test_first") %>%
    ggplot(aes(test_first,acc, group=1)) +
    # stat_summary(geom="col", width=0.5, fill="lightgrey", color='black') +
    stat_summary(geom="pointrange", size=0.2) +
    stat_summary(geom="errorbar", width=0.1) +
    # stat_summary(geom="errorbar", width=0.15) + 
    # coord_cartesian(ylim=c(0,1)) +
    stat_summary(geom="line") +
    scale_y_continuous('Overall free recall probability') +
    coord_cartesian(ylim=c(0,0.4)) +
    scale_x_discrete("Color of first test") +
    theme_bw() +
    theme(panel.grid.major.x = element_blank(),
          panel.grid.minor.x = element_blank()) +
    ggtitle("Experiment 5"))



mldat <- memdat %>% 
  filter(!exclude,!is.na(testid)) %>% 
  group_by(id, test_first) %>% 
  summarise(n = max(abs_output_position, na.rm=T)/30) %>% 
  mutate(nobs = 30)

mldat %>% 
  group_by(test_first) %>% 
  summarise(acc_se = sd(n)/sqrt(length(n)),
            acc = mean(n),
            acc_lower95 = acc-1.96*acc_se,
            acc_upper95 = acc+1.96*acc_se)

glm(n ~ test_first, data=mldat, family="binomial", weights = nobs) %>% summary()

# number of recalled items from the test (split by test number)
testdat %>% 
  filter(!exclude,!is.na(testid)) %>% 
  group_by(id, test_first,testid) %>% 
  summarise(n = max(output_position)) %>% 
  ggplot(aes(test_first,n, color=as.factor(testid))) +
  stat_summary(geom="pointrange")

# number of recalled items from the test (by color)
memdat %>% 
  filter(!exclude,!is.na(testid)) %>% 
  group_by(id, test_first, presented_color) %>% 
  summarise(n = max(abs_output_position, na.rm=T)) %>% 
  ggplot(aes(test_first,n, color=presented_color)) +
  stat_summary(geom="pointrange")

(f2 <- memdat %>% 
  filter(!exclude, test_first != 'all') %>%
  group_by(id, test_first, presented_color) %>% 
  summarise(acc = mean(strict_acc)) %>% 
  Rmisc::normDataWithin('id','acc', betweenvars = "test_first") %>%
  ggplot(aes(test_first,accNormed, color=presented_color, group=presented_color)) +
  # stat_summary(geom="col", position="dodge", width=0.5) +
  stat_summary(geom="pointrange", size=0.2) +
  stat_summary(geom="errorbar", width=0.1) +
  stat_summary(geom="line") +
  theme_bw() +
  scale_x_discrete('Color cue for Test 1') +
  scale_y_continuous('Overall correct recall probability') +
  scale_color_discrete('Item color') +
  coord_cartesian(ylim=c(0,0.4)) +
  ggtitle('Experiment 5 - Output interference') +
  theme(legend.position = c(0.95,0.95), legend.justification = c(1,1),
        panel.grid.major.x = element_blank(),
        panel.grid.minor.x = element_blank()))

ggsave('figures/exp5_strictacc_by_test1color_itemcolor.png', width=4, height=4)


f2+f1
ggsave('figures/exp5_f1_f2.png', width=7, height=3.5, units='in')


memdat %>% 
  filter(!exclude, test_first != 'all') %>%
  mutate(presented_color = ifelse(presented_color == " red","red",presented_color),
         color_order = ifelse(test_first == presented_color, 1, 2)) %>% 
  group_by(id, color_order) %>% 
  summarise(acc = mean(strict_acc, na.rm=T)) %>% 
  spread(color_order, acc) %>% 
  mutate(delta = `1`-`2`) %>% 
  ungroup() %>% 
  summarise(acc_se = sd(delta)/sqrt(length(delta)),
          acc = mean(delta),
          acc_lower95 = acc-1.96*acc_se,
          acc_upper95 = acc+1.96*acc_se)

  
memdat %>% 
  filter(!exclude, test_first != 'all') %>%
  mutate(presented_color = ifelse(presented_color == " red","red",presented_color),
    color_order = ifelse(test_first == presented_color, 1, 2)) %>% 
  group_by(id, test_first, presented_color) %>% 
  summarise(acc = mean(strict_acc, na.rm=T))

# number of recalled items from the test (by color and testid)
memdat %>% 
  filter(!exclude,!is.na(testid)) %>% 
  group_by(id, test_first, presented_color, testid) %>% 
  summarise(n = sum(!is.na(output_pos1))) %>% 
  ggplot(aes(test_first,n, color=presented_color)) +
  stat_summary(geom="pointrange") +
  # geom_point(alpha=0.25, position=position_jitter(width=0.15)) +
  facet_wrap(~testid)



# overall accuracy per group, ignoring intrusions of wrong color item
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000) %>% 
  ggplot(aes(test_first, acc)) +
  stat_summary(geom="pointrange")



# overall accuracy per group, ignoring intrusions of wrong color item (split by presented_color)
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000) %>% 
  ggplot(aes(test_first, acc, color=presented_color)) +
  stat_summary(geom="pointrange")


# strict accuracy by group and presented color
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000, maxrt < 20000) %>% 
  ggplot(aes(test_first, strict_acc, color=presented_color)) +
  stat_summary(geom="pointrange")


# strict accuracy depending on the test order
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000, maxrt < 20000) %>% 
  ggplot(aes(test_pos, strict_acc)) +
  stat_summary(geom="pointrange")


# intrusions 
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000) %>% 
  ggplot(aes(test_first, color_intrusions, color=presented_color)) +
  stat_summary(geom="pointrange")
memdat %>% 
  filter(!exclude, studyRT > 500, studyRT < 10000) %>% 
  ggplot(aes(test_pos, color_intrusions, color=presented_color)) +
  stat_summary(geom="pointrange")








glmer(acc ~ test_first + (1|id) + (1|word1), data=filter(memdat, !exclude), family="binomial") %>% summary()
glmer(strict_acc ~ test_first*presented_color + (1|id) + (1|word1), data=filter(memdat, !exclude, studyRT > 500, studyRT < 10000, maxrt < 20000, test_first != "all"), family="binomial") %>% summary()
glmer(strict_acc ~ test_pos + (1|id) + (1|word1), data=filter(memdat, !exclude), family="binomial") %>% summary()

glmer(strict_acc ~ test_pos + (1|id) + (1|word1), data=filter(memdat, !exclude, studyRT > 500, studyRT < 10000, maxrt < 20000, test_pos != "Both tested together"), family="binomial") %>% summary()
glmer(color_intrusions ~ test_first*presented_color + (1|id) + (1|word1), data=filter(memdat, !exclude, studyRT > 500, studyRT < 10000, maxrt < 20000, test_pos != "Both tested together"), family="binomial") %>% summary()
