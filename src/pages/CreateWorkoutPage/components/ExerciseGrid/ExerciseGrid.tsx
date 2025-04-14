import { DndContext, DragOverlay, UniqueIdentifier, closestCorners } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { ExerciseCard } from '@/pages/ExcercisesPage/components';
import { IconGripVertical } from '@tabler/icons-react';
import { SortableItem } from '../SortableItem/SortableItem';
import classes from '../../CreateWorkoutPage.module.css';

interface ExerciseGridProps {
  selectedExercises: any[];
  activeId: UniqueIdentifier | null; 
  activeExercise: any;
  handleDragStart: (event: any) => void;
  handleDragEnd: (event: any) => void;
  setSelectedExercise: (exercise: any) => void;
  handleDeleteExercise: (uniqId: string) => void;
}

export const ExerciseGrid: React.FC<ExerciseGridProps> = ({
  selectedExercises,
  activeId,
  activeExercise,
  handleDragStart,
  handleDragEnd,
  setSelectedExercise,
  handleDeleteExercise,
}) => {
  return (
    <div className="grid">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext
          items={selectedExercises.map((ex) => ex.uniqId)}
          strategy={rectSortingStrategy}
        >
          <div className={classes.exerciseGrid}>
            {selectedExercises.map((exercise) => (
              <SortableItem
                key={exercise.uniqId}
                exercise={exercise}
                onEdit={() => setSelectedExercise(exercise)}
                onDelete={() => handleDeleteExercise(exercise.uniqId)}
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false} dropAnimation={{ duration: 250, easing: 'ease' }}>
          {activeId && activeExercise ? (
            <div className={classes.exerciseItem} style={{ cursor: 'grabbing' }}>
              <div className={classes.dragHandle}>
                <IconGripVertical size={50} />
              </div>
              <div className={classes.cardContainer}>
                <ExerciseCard id={activeExercise.id} exercise={activeExercise} />
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};