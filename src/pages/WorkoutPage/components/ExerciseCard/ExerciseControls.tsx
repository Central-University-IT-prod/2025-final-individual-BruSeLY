import { Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import ExerciseTimer from "../ExerciseTimer/ExerciseTimer";
import { Exercise, WorkoutExercise } from "@/flow/types";

interface ExerciseControlsProps {
  currentExercise: Exercise;
  currentWorkoutExercise: WorkoutExercise;
  exerciseCompleted: boolean;
  isWorkoutCompleted: boolean;
  onExerciseComplete: (repsCompleted: number, timeSpent?: number, type?: string) => void;
}

export const ExerciseControls: React.FC<ExerciseControlsProps> = ({
  currentExercise,
  currentWorkoutExercise,
  exerciseCompleted,
  isWorkoutCompleted,
  onExerciseComplete,
}) => {
  return currentExercise.type === 'Время' ? (
    <ExerciseTimer
      target={currentWorkoutExercise.target}
      onComplete={(timeSpent) => onExerciseComplete(0, timeSpent, 'time')}
      isDisabled={isWorkoutCompleted}
      exerciseId={currentExercise.id}
    />
  ) : (
    <Button
      className="completeButton"
      onClick={() => onExerciseComplete(currentWorkoutExercise.target)}
      disabled={exerciseCompleted || isWorkoutCompleted}
      leftSection={<IconCheck size={16} />}
    >
      Завершить задание
    </Button>
  );
};