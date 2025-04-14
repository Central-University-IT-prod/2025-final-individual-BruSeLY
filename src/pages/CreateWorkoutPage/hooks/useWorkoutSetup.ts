import { useWorkoutStore } from '@/flow/store/WorkoutStore';
import { Workout, WorkoutExercise } from '@/flow/types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';


export const useWorkoutSetup = () => {
  const { workoutId } = useParams<{ workoutId?: string }>();
  const { getWorkoutById } = useWorkoutStore();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);

  useEffect(() => {
    if (workoutId) {
      const loadedWorkout = getWorkoutById(workoutId);
      if (loadedWorkout) {
        setWorkout(loadedWorkout);
        setSelectedExercises(loadedWorkout.exercises);
      }
    }
  }, [workoutId, getWorkoutById]);

  const handleClearBoard = () => {
    setSelectedExercises([]);
    setWorkout(null);
  };

  return {
    workout,
    selectedExercises,
    setSelectedExercises,
    handleClearBoard,
  };
};