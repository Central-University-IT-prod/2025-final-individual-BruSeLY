import { useDisclosure } from '@mantine/hooks';
import { useExerciseStore } from '../../flow/store/ExercisesStore';
import { useExerciseFilters } from './hooks/useExerciseFilters';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { AddExerciseModal, ExerciseGrid, FilterSection } from './components';
import classes from './ExercisesPage.module.css';
import { SearchInput } from '@/components/InputSearch/InputSearch';


const ExercisesPage = () => {
  const { exercises } = useExerciseStore();
  const [opened, { open, close }] = useDisclosure(false);
  const {
    searchQuery,
    selectedDifficulties,
    filteredExercises,
    handleSearchChange,
    handleDifficultyChange,
    handleEquipmentChange,
    handleTagsChange,
  } = useExerciseFilters(exercises);

  return (
    <div className='wrapper'>
      <h1 className={classes.title}>Библиотека упражнений</h1>
      <div className="header">
        <div className={classes.actions}>
          <SearchInput value={searchQuery} onChange={handleSearchChange} />
          <FilterSection
            selectedDifficulties={selectedDifficulties}
            onDifficultyChange={handleDifficultyChange}
            onEquipmentChange={handleEquipmentChange}
            onTagsChange={handleTagsChange}
          />
          <Tooltip label='Добавить упражнение'>
            <ActionIcon
              onClick={open}
              variant="filled"
              size='lg'
              radius='md'
              className={classes.addButton}
            >
              <IconPlus size='24'/>
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
      
      <ExerciseGrid exercises={filteredExercises} />
      <AddExerciseModal opened={opened} onClose={close} />
    </div>
  );
};

export default ExercisesPage;