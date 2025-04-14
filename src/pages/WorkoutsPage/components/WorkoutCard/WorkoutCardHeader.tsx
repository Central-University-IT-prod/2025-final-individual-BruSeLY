import { Text, Badge, Flex } from '@mantine/core';
import { translateDifficulty } from '@/flow/utils';
import classes from './WorkoutCard.module.css';
import { DifficultyLevel } from '@/flow/types';

interface WorkoutCardHeaderProps {
  title: string;
  difficulty: DifficultyLevel;
}

const WorkoutCardHeader: React.FC<WorkoutCardHeaderProps> = ({ title, difficulty }) => (
  <Flex justify="space-between" align="center" className={classes.headerContent}>
    <Text fw={700} className={classes.title}>{title}</Text>
    <Badge
      variant="filled"
      className={classes.difficulty}
      color={difficulty === 'advanced' ? 'red' : difficulty === 'intermediate' ? 'orange' : 'green'}
    >
      {translateDifficulty(difficulty)}
    </Badge>
  </Flex>
);

export default WorkoutCardHeader;