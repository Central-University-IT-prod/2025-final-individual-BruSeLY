import { useState, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useExerciseStore } from '../../../flow/store/ExercisesStore';
import { useWorkoutStore } from '../../../flow/store/WorkoutStore';
import { Exercise } from '../../../flow/types';

export const useExerciseCard = (exercise: Exercise) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { removeExercise } = useExerciseStore();


  const checkExerciseInWorkouts = useCallback((exerciseId: string): boolean => {
    return useWorkoutStore.getState().workouts.some(workout =>
      workout.exercises.some(ex => ex.id === exerciseId)
    );
  }, []);

  const handleDelete = useCallback(async () => {
    if (checkExerciseInWorkouts(exercise.id)) {
      showNotification({
        message: 'Это упражнение уже используется в тренировке!',
        color: 'red'
      });
      return;
    }
    await removeExercise(exercise.id);
  }, [exercise.id, checkExerciseInWorkouts, removeExercise]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !opened && !openedEditModal) {
      if (!showInstructions) {
        setShowInstructions(true);
      } else {
        setIsAnimating(true);
        setTimeout(() => {
          setShowInstructions(false);
          setIsAnimating(false);
        }, 500);
      }
    }
  }, [opened, openedEditModal, showInstructions]);

  return {
    opened,
    openedEditModal,
    showInstructions,
    isAnimating,
    open,
    close,
    openEditModal,
    closeEditModal,
    handleDelete,
    handleCardClick,
  };
};