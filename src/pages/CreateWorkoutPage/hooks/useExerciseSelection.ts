import { useUserStore } from '@/flow/store/UserStore';
import { WorkoutExercise, Exercise } from '@/flow/types';
import { calculateExerciseTarget } from '@/flow/utils';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export const useExerciseSelection = () => {
  const user = useUserStore((state) => state.user);
  const [selectedExercise, setSelectedExercise] = useState<WorkoutExercise | null>(null);

  const handleAddExercise = useCallback(
    (exercise: Exercise, selectedExercises: WorkoutExercise[]) => {
      const newExercise: WorkoutExercise = {
        ...exercise,
        uniqId: uuidv4(),
        target: exercise.defaultValue,
        order: selectedExercises.length + 1,
      };
      return newExercise;
    },
    []
  );

  const handleSaveExercise = useCallback(
    (updatedExercise: WorkoutExercise, selectedExercises: WorkoutExercise[]) => {
      return selectedExercises.map((ex) =>
        ex.uniqId === updatedExercise.uniqId ? updatedExercise : ex
      );
    },
    []
  );

  const handleDeleteExercise = useCallback(
    (uniqId: string, selectedExercises: WorkoutExercise[]) => {
      return selectedExercises.filter((ex) => ex.uniqId !== uniqId);
    },
    []
  );

  const handleAutoSelectExercises = useCallback(
    (
      exercises: Exercise[],
      selectedTags: string[],
      selectedEquipment: string[],
      maxAutoExercises: number
    ) => {
      if (!user) return [];

      const filteredExercises = exercises.filter((exercise) => {
        const hasMatchingTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => exercise.tags.includes(tag));

        const hasMatchingEquipment =
          selectedEquipment.length === 0 ||
          selectedEquipment.some((eq) => exercise.equipment.includes(eq));

        if (selectedTags.length > 0 && selectedEquipment.length > 0) {
          return hasMatchingTags && hasMatchingEquipment;
        }

        return hasMatchingTags || hasMatchingEquipment;
      });

      const shuffledExercises = [...filteredExercises]
        .sort(() => Math.random() - 0.5)
        .slice(0, maxAutoExercises);

      return shuffledExercises.map((exercise, index) => ({
        ...exercise,
        uniqId: uuidv4(),
        target: calculateExerciseTarget(exercise, user),
        order: index + 1,
      }));
    },
    [user]
  );


  return {
    selectedExercise,
    setSelectedExercise,
    handleAddExercise,
    handleSaveExercise,
    handleDeleteExercise,
    handleAutoSelectExercises,
  };
};