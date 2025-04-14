import { Badge, Group } from '@mantine/core';
import classes from './WorkoutCard.module.css';
import { IconBarbell, IconClock } from '@tabler/icons-react';

const getExerciseTypeIcon = (type: string, target: number) => {
  switch (type) {
    case 'Вес':
      return (
        <Group gap={4}>
          <IconBarbell size={14} />
          <span>{target} кг</span>
        </Group>
      );
    case 'Время':
      return (
        <Group gap={4}>
          <IconClock size={14} />
          <span>{target} мин</span>
        </Group>
      );
    case 'Количество':
      return (
        <Group gap={4}>
          <span>×{target}</span>
        </Group>
      );
    default:
      return <span>×{target}</span>;
  }
};

interface ExerciseTypesProps {
  exercises: Array<{ id: string; target: number }>;
  allExercises: Array<{ id: string; type: string }>;
}

const ExerciseTypes: React.FC<ExerciseTypesProps> = ({ exercises, allExercises }) => (
  <div className={classes.exerciseTypes}>
    <div className={classes.exerciseTypesBadges}>
      {Array.from(new Set(exercises.map(e => e.id)))
        .slice(0, 2)
        .map((exerciseId, index) => {
          const exercise = allExercises.find(ex => ex.id === exerciseId);
          const target = exercises.find(e => e.id === exerciseId)?.target || 0;
          return (
            <Badge key={index} className={classes.typeBadge}>
              {getExerciseTypeIcon(exercise?.type || 'Количество', target)}
            </Badge>
          );
        })}
    </div>
    {exercises.length > 3 && (
      <div className={classes.moreBadge}>+{exercises.length - 3}</div>
    )}
  </div>
);

export default ExerciseTypes;