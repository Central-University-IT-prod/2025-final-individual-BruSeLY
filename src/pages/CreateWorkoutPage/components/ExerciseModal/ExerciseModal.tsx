import { Modal } from '@mantine/core';
import classes from '../../CreateWorkoutPage.module.css'
import { Exercise } from '@/flow/types';
import { ExerciseCard } from '@/pages/ExcercisesPage/components';

export const ExerciseModal = ({ 
  isOpen, 
  onClose, 
  exercises, 
  onSelect 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  exercises: Exercise[], 
  onSelect: (exercise: Exercise) => void 
}) => (
  <Modal opened={isOpen} onClose={onClose} title="Выберите упражнение" size="xl"
  >
    <div className={classes.exerciseLibrary}>
      {exercises.map((exercise) => (
        <div key={exercise.id} onClick={() => onSelect(exercise)} className={classes.libraryItem}>
          <ExerciseCard id={exercise.id} exercise={exercise} activity={false} />
        </div>
      ))}
    </div>
  </Modal>
);