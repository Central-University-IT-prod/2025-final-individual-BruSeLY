import { SimpleGrid, TextInput, Box } from '@mantine/core';
import classes from './WorkoutsPage.module.css';
import { useWorkoutStore } from '../../flow/store/WorkoutStore';
import { WorkoutCard } from './components';
import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedValue } from '@mantine/hooks';

const WorkoutsPage = () => {
  const { workouts, loadWorkouts } = useWorkoutStore();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300); 

  useEffect(() => {
    loadWorkouts(); 
  }, [loadWorkouts]);

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  return (
    <div className="wrapper">
      <div className={classes.header}>
        <h1 className={classes.title}>Библиотека Тренировок</h1>
        <div className={classes.headerContent}>
          <TextInput
            placeholder="Поиск по названию..."
            value={searchQuery}
            radius='md' 
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<IconSearch size={18} />}
            className={classes.searchInput}
          />
        </div>
      </div>
      <Box className={classes.gridContainer}>
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="md"
          verticalSpacing="xl"
          className="grid"
        >
          {filteredWorkouts.map((workout) => (
            <WorkoutCard workout={workout} key={workout.id} />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default WorkoutsPage;