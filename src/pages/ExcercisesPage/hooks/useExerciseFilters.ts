import { useState, useCallback, useMemo } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { DifficultyLevel, Exercise } from '../../../flow/types';


export const useExerciseFilters = (exercises: Exercise[]) => {
  const [selectedDifficulties, setSelectedDifficulties] = useState<DifficultyLevel[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  const handleDifficultyChange = useCallback((values: string[]) => {
    setSelectedDifficulties(values as DifficultyLevel[]);
  }, []);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleEquipmentChange = useCallback((values: string[]) => {
    setSelectedEquipment(values);
  }, []);

  const handleTagsChange = useCallback((values: string[]) => {
    setSelectedTags(values);
  }, []);

  const filteredExercises = useMemo(() => {
    return exercises.filter(exercise => {
      const matchesDifficulty = selectedDifficulties.length === 0 || 
        selectedDifficulties.includes(exercise.difficulty);
      
      const matchesEquipment = selectedEquipment.length === 0 || 
        selectedEquipment.some(equip => exercise.equipment.includes(equip));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => exercise.tags.includes(tag));

      const matchesSearch = !debouncedSearchQuery.trim() || 
        exercise.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      return matchesDifficulty && matchesEquipment && matchesTags && matchesSearch;
    }).reverse();
  }, [exercises, selectedDifficulties, selectedEquipment, selectedTags, debouncedSearchQuery]);

  return {
    searchQuery,
    selectedDifficulties,
    filteredExercises,
    handleSearchChange,
    handleDifficultyChange,
    handleEquipmentChange,
    handleTagsChange,
  };
};