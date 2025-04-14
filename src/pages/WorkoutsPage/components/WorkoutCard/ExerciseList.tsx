import { Collapse, Text } from '@mantine/core';
import classes from './WorkoutCard.module.css';

interface ExerciseListProps {
  show: boolean;
  exercises: Array<{ id: string }>;
  getExerciseTitle: (id: string) => string;
}

const ExerciseList: React.FC<ExerciseListProps> = ({ show, exercises, getExerciseTitle }) => (
  <Collapse in={show}>
    <div className={classes.exerciseList}>
      <Text size="sm" fw={500} mb="sm">Упражнения:</Text>
      <div>
        {exercises.map((exercise, index) => (
          <div key={index} className={classes.exerciseItem}>
            {getExerciseTitle(exercise.id)}
          </div>
        ))}
      </div>
    </div>
  </Collapse>
);

export default ExerciseList;