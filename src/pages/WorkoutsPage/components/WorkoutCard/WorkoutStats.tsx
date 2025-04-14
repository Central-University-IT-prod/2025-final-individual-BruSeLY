import { Group, Text } from '@mantine/core';
import { IconRun, IconClock } from '@tabler/icons-react';
import classes from './WorkoutCard.module.css';

interface WorkoutStatsProps {
  exerciseCount: number;
}

const WorkoutStats: React.FC<WorkoutStatsProps> = ({ exerciseCount }) => (
  <div className={classes.stats}>
    <Group gap={4}>
      <IconRun size={16} className={classes.statIcon} />
      <Text size="sm">{exerciseCount} упражнений</Text>
    </Group>
    <Group gap={4}>
      <IconClock size={16} className={classes.statIcon} />
      <Text size="sm">~{exerciseCount * 10} мин</Text>
    </Group>
  </div>
);

export default WorkoutStats;