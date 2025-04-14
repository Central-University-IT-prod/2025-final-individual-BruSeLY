import { useState, useCallback } from 'react';
import { DragStartEvent, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export const useDragAndDrop = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = useCallback((event: DragStartEvent) => setActiveId(event.active.id), []);
  const handleDragEnd = useCallback(
    (event: DragEndEvent, selectedExercises: any[], setSelectedExercises: (items: any[]) => void) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      setSelectedExercises(
        arrayMove(
          selectedExercises,
          selectedExercises.findIndex((item) => item.uniqId === active.id),
          selectedExercises.findIndex((item) => item.uniqId === over.id)
        )
      );
      setActiveId(null);
    },
    []
  );

  return {
    activeId,
    handleDragStart,
    handleDragEnd,
  };
};