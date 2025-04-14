import { useState } from 'react';

export const useFilters = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [maxAutoExercises, setMaxAutoExercises] = useState<number>(5);

  return {
    selectedTags,
    setSelectedTags,
    selectedEquipment,
    setSelectedEquipment,
    maxAutoExercises,
    setMaxAutoExercises,
  };
};