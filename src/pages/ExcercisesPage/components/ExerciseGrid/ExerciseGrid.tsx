import { SimpleGrid } from '@mantine/core';
import { Exercise } from '../../../../flow/types';
import ExerciseCard from '../ExerciseCard/ExerciseCard';


interface ExerciseGridProps {
  exercises: Exercise[];
}

const ExerciseGrid = (({ exercises }: ExerciseGridProps) => (
  <SimpleGrid
    cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
    spacing="xl"
    verticalSpacing="xl"
    className="grid"
  >
    {exercises.map((exercise) => (
      <ExerciseCard 
        key={exercise.id} 
        exercise={exercise} 
        id={exercise.id} 
        activity={true} 
      />
    ))}
  </SimpleGrid>
));

export default ExerciseGrid;