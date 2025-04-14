import { Drawer, Title, Text, ScrollArea, Progress, Badge, Card, Group } from '@mantine/core';
import {
  IconTrophy,
  IconClock,
  IconRun,
} from '@tabler/icons-react';
import { Achievement } from '../../../../flow/types';
import classes from './Achievements.module.css';
import React from 'react';

interface AchievementsDrawerProps {
  opened: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'IconTrophy':
      return <IconTrophy size={24} color="white" />;
    case 'IconClock':
      return <IconClock size={24} color="white" />;
    case 'IconRun':
      return <IconRun size={24} color="white" />;
    case 'IconDumbbell':
      return <IconClock size={24} color="white" />;
    case 'IconChest':
      return <IconRun size={24} color="white" />;
    case 'IconHair':
      return <IconTrophy size={24} color="white" />;
    default:
      return null;
  }
};

const Achievements: React.FC<AchievementsDrawerProps> = ({ opened, onClose, achievements }) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      title="Ваши достижения"
      padding="xl"
      size="md"
    >
      <ScrollArea>
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`${classes.achievementCard} ${
                achievement.progress >= achievement.total ? classes.completed : ''
              }`}
              bg="linear-gradient(45deg, #6a11cb, #2575fc)" 
              shadow="sm"
              padding="md"
              radius="md"
              m="sm"
            >
              <Group justify="space-between">
                <Group>
                  {getIcon(achievement.icon)}
                  <div>
                    <Title c="white" order={4}>{achievement.title}</Title>
                    <Text size="sm" c="white">
                      {achievement.description}
                    </Text>
                  </div>
                </Group>
              </Group>
              <Group justify="space-between" mt="md">
                <Text c="white" size="sm">
                  Прогресс: {achievement.progress}/{achievement.total}
                </Text>
                <Progress
                  value={(achievement.progress / achievement.total) * 100}
                  size="sm"
                  color="orange" 
                  style={{ flex: 1, marginLeft: '8px' }}
                />
              </Group>
              <Group mt="md">
                <Badge color="blue">+{achievement.reward} монет</Badge>
              </Group>
            </Card>
          ))
        ) : (
          <Text>У вас пока нет достижений.</Text>
        )}
      </ScrollArea>
    </Drawer>
  );
};

export default Achievements;