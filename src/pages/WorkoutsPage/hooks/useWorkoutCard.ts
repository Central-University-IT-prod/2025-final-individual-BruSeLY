import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router';
import { useExerciseStore } from '@/flow/store/ExercisesStore';
import { useWorkoutStore } from '@/flow/store/WorkoutStore';
import { Workout } from '@/flow/types';

export const useWorkoutCard = (workout: Workout) => {
  const [showExercises, setShowExercises] = useState(false);
  const { exercises: allExercises } = useExerciseStore();
  const deleteWorkout = useWorkoutStore((state) => state.deleteWorkout);
  const [openedDeleteModal, deleteModalHandlers] = useDisclosure(false);
  const [openedScheduleModal, scheduleModalHandlers] = useDisclosure(false);
  const navigate = useNavigate();

  const handleDeleteWorkout = () => {
    deleteWorkout(workout.id);
  };

  const getExerciseTitle = (exerciseId: string): string => {
    const exercise = allExercises.find((ex) => ex.id === exerciseId);
    return exercise ? exercise.title : `Упражнение ${exerciseId}`;
  };

  const navigateToWorkout = () => navigate(`/workouts/${workout.id}`);
  const navigateToEdit = () => navigate(`/workouts/editWorkout/${workout.id}`);

  return {
    showExercises,
    setShowExercises,
    openedDeleteModal,
    openedScheduleModal,
    deleteModalHandlers,
    scheduleModalHandlers,
    handleDeleteWorkout,
    getExerciseTitle,
    navigateToWorkout,
    navigateToEdit,
    allExercises,
  };
};