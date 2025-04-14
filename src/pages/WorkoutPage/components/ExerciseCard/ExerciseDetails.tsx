import { Title, Text } from "@mantine/core";
import { Exercise, WorkoutExercise } from "@/flow/types";
import ExerciseTarget from "./ExerciseTarget";
import classes from '../../WorkoutPage.module.css';

interface ExerciseDetailsProps {
  currentExercise: Exercise;
  currentWorkoutExercise: WorkoutExercise;
}

export const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({
  currentExercise,
  currentWorkoutExercise,
}) => {
  return (
    <>
      <Title order={3} className={classes.exerciseTitle} mb="sm">
        {currentExercise.title}
      </Title>
      <Text className={classes.description} mb="md">
        {currentExercise.description}
      </Text>
      <ExerciseTarget exercise={currentExercise} workoutExercise={currentWorkoutExercise} />
    </>
  );
};