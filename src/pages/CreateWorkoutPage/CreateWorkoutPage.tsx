import { useMemo } from 'react';
import { useExerciseFilters } from './hooks/useExerciseFilters';
import { useExerciseStore } from '../../flow/store/ExercisesStore';
import { useWorkoutSetup } from './hooks/useWorkoutSetup';
import { useExerciseSelection } from './hooks/useExerciseSelection';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useModals } from './hooks/useModals';
import { useFilters } from './hooks/useFilters';
import WorkoutSaveModal from './components/WorkoutSaveModal/WorkoutSaveModal';
import { ExerciseGrid } from './components/ExerciseGrid/ExerciseGrid';
import { HeaderActions } from './components/HeaderActions/HeaderActions';
import { ExerciseModal } from './components/ExerciseModal/ExerciseModal';
import ExerciseSettingsModal from './components/ExerciseSettingsModal/ExerciseSettingsModal';

const CreateWorkoutPage = () => {
  const { exercises } = useExerciseStore();
  const { allTags, allEquipment } = useExerciseFilters(exercises);
  const { workout, selectedExercises, setSelectedExercises, handleClearBoard } = useWorkoutSetup();
  const {
    selectedExercise,
    setSelectedExercise,
    handleAddExercise,
    handleSaveExercise,
    handleDeleteExercise,
    handleAutoSelectExercises,
  } = useExerciseSelection();
  const { activeId, handleDragStart, handleDragEnd } = useDragAndDrop();
  const { isModalOpen, openModal, closeModal, isSaveModalOpen, openSaveModal, closeSaveModal } = useModals();
  const { selectedTags, setSelectedTags, selectedEquipment, setSelectedEquipment, maxAutoExercises, setMaxAutoExercises } = useFilters();

  const activeExercise = useMemo(
    () => selectedExercises.find((ex) => ex.uniqId === activeId),
    [selectedExercises, activeId]
  );

  return (
    <div className="wrapper">
      <HeaderActions
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        maxAutoExercises={maxAutoExercises}
        setMaxAutoExercises={setMaxAutoExercises}
        handleAutoSelectExercises={() =>
          setSelectedExercises(
            handleAutoSelectExercises(exercises, selectedTags, selectedEquipment, maxAutoExercises)
          )
        }
        openModal={openModal}
        openSaveModal={openSaveModal}
        selectedExercises={selectedExercises}
        allTags={allTags}
        allEquipment={allEquipment}
      />

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={closeModal}
        exercises={exercises}
        onSelect={(exercise) => {
          const newExercise = handleAddExercise(exercise, selectedExercises);
          setSelectedExercises((prev) => [...prev, newExercise]);
          closeModal();
        }}
      />

      <ExerciseSettingsModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onSave={(updatedExercise) => {
          const updatedExercises = handleSaveExercise(updatedExercise, selectedExercises);
          setSelectedExercises(updatedExercises);
        }}
      />
      <WorkoutSaveModal
        opened={isSaveModalOpen}
        onClose={closeSaveModal}
        selectedExercises={selectedExercises}
        workout={workout}
        selectedTags={selectedTags}
        onClearBoard={handleClearBoard}
      />

      <ExerciseGrid
        selectedExercises={selectedExercises}
        activeId={activeId}
        activeExercise={activeExercise}
        handleDragStart={handleDragStart}
        handleDragEnd={(event) => handleDragEnd(event, selectedExercises, setSelectedExercises)}
        setSelectedExercise={setSelectedExercise}
        handleDeleteExercise={(uniqId) => {
          const updatedExercises = handleDeleteExercise(uniqId, selectedExercises);
          setSelectedExercises(updatedExercises);
        }}
      />
    </div>
  );
};

export default CreateWorkoutPage;