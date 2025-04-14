import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ActionIcon } from '@mantine/core';
import { IconGripVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import classes from '../../CreateWorkoutPage.module.css'
import { ExerciseCard } from '@/pages/ExcercisesPage/components';
import { WorkoutExercise } from '@flow/types'

interface Props {
  exercise: WorkoutExercise,
  onEdit: () => void,
  onDelete: () => void
}

export const SortableItem: React.FC<Props> = ({ exercise, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: exercise.uniqId, 
    transition: { duration: 250, easing: 'ease' },
    animateLayoutChanges: () => true,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={classes.exerciseItem} {...attributes}>
      {isDragging && <div className={classes.dragOverlay} />}
      <div className={classes.dragHandle} {...listeners}>
        <IconGripVertical size={42} color='violet'/>
      </div>
      <div className={classes.cardContainer}>
        <ExerciseCard id={exercise.id} exercise={exercise} />
      </div>
      <div className={classes.controls}>
        <ActionIcon size="sm" variant="subtle" onClick={onEdit}>
          <IconEdit size={14} />
        </ActionIcon>
        <ActionIcon size="sm" variant="subtle" color="red" onClick={onDelete}>
          <IconTrash size={14} />
        </ActionIcon>
      </div>
    </div>
  );
};