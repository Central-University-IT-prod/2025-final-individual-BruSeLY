import { Title, Progress } from "@mantine/core";
import classes from '../../WorkoutPage.module.css';

interface ExerciseHeaderProps {
  workoutTitle: string;
  progress: number;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ workoutTitle, progress }) => {
  return (
    <>
      <Title order={2} className={classes.title} mb="md">
        {workoutTitle}
      </Title>
      <Progress value={progress} size="md" color="blue" mb="md" />
    </>
  );
};