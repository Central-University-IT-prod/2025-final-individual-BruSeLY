import { Card } from "@mantine/core";
import { Exercise, WorkoutExercise } from "@/flow/types";
import { NavigationButtons } from "./NavigationButtons";
import { ExerciseHeader } from "./ExerciseHeader";
import { ExerciseDetails } from "./ExerciseDetails";
import { ExerciseControls } from "./ExerciseControls";
import { ExerciseInstructions } from "./ExerciseInstructions";
import classes from '../../WorkoutPage.module.css';

interface ExerciseCardProps {
  workoutTitle: string;
  progress: number;
  currentExercise: Exercise;
  currentWorkoutExercise: WorkoutExercise;
  exerciseCompleted: boolean;
  isWorkoutCompleted: boolean;
  showInstructions: boolean;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  onExerciseComplete: (repsCompleted: number, timeSpent?: number, type?: string) => void;
  currentExerciseIndex: number;
  isLastExercise: boolean;
  handleSkipExercise: () => void;
  showWorkoutStats: () => void;
  stats: {
    experienceGained: number;
    coinsGained: number;
    exerciseStats: Array<{ title: string; repetitions: number; timeSpent: number }>;
  };
  workout: {
    exercises: WorkoutExercise[];
  };
  setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  workoutTitle,
  progress,
  currentExercise,
  currentWorkoutExercise,
  exerciseCompleted,
  isWorkoutCompleted,
  showInstructions,
  setShowInstructions,
  onExerciseComplete,
  currentExerciseIndex,
  isLastExercise,
  handleSkipExercise,
  showWorkoutStats,
  stats,
  workout,
  setCurrentExerciseIndex,
}) => {
  const handleNextExercise = () => {
    setCurrentExerciseIndex(currentExerciseIndex + 1);
  };

  return (
    <Card className={classes.exerciseCard} shadow="sm" padding="lg" radius="md">
      <ExerciseHeader workoutTitle={workoutTitle} progress={progress} />
      <ExerciseDetails
        currentExercise={currentExercise}
        currentWorkoutExercise={currentWorkoutExercise}
      />
      <ExerciseControls
        currentExercise={currentExercise}
        currentWorkoutExercise={currentWorkoutExercise}
        exerciseCompleted={exerciseCompleted}
        isWorkoutCompleted={isWorkoutCompleted}
        onExerciseComplete={onExerciseComplete}
      />
      <ExerciseInstructions
        showInstructions={showInstructions}
        setShowInstructions={setShowInstructions}
        instructions={currentExercise.instructions}
      />
      <NavigationButtons
        isFirst={currentExerciseIndex === 0}
        isLast={isLastExercise}
        onBack={() => setCurrentExerciseIndex((prev) => prev - 1)}
        onSkip={handleSkipExercise}
        onNext={() => {
          if (isLastExercise) {
            showWorkoutStats();
          } else {
            handleNextExercise();
          }
        }}
        disableNext={(stats.exerciseStats.length === 0 && isLastExercise) || isWorkoutCompleted}
        disableSkip={currentExerciseIndex === workout.exercises.length - 1 || isWorkoutCompleted}
      />
    </Card>
  );
};