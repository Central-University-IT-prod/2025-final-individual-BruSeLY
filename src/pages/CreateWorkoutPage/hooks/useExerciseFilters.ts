import { useState } from 'react';
import { Exercise } from '@flow/types';

export const useExerciseFilters = (exercises: Exercise[]) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const allTags = Array.from(new Set(exercises.flatMap((exercise) => exercise.tags)));
  const allEquipment = Array.from(new Set(exercises.flatMap((exercise) => exercise.equipment)));

  return {
    selectedTags,
    setSelectedTags,
    selectedEquipment,
    setSelectedEquipment,
    allTags,
    allEquipment,
  };
};