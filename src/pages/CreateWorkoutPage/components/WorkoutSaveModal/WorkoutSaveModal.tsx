import { Modal, TextInput, Button, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { Workout, WorkoutExercise } from '../../../../flow/types';
import { useWorkoutForm } from './hooks/useWorkoutForm';
import { useWorkoutActions } from './hooks/useWorkoutActions';
import classes from './WorkoutSaveModal.module.css';

interface Props {
  opened: boolean;
  onClose: () => void;
  selectedExercises: WorkoutExercise[];
  selectedTags: string[];
  workout?: Workout | null;
  onClearBoard: () => void;
}

const WorkoutSaveModal: React.FC<Props> = ({
  opened,
  onClose,
  selectedExercises,
  selectedTags,
  workout,
  onClearBoard,
}) => {
  const {
    workoutTitle,
    setWorkoutTitle,
    workoutDescription,
    setWorkoutDescription,
    formErrors,
    setFormErrors,
    validateForm,
  } = useWorkoutForm(workout?.title || '', workout?.description || '');

  const { handleSaveWorkout, handleUseOnce } = useWorkoutActions(
    workout,
    selectedExercises,
    selectedTags,
    onClearBoard,
    onClose
  );

  useEffect(() => {
    if (workout) {
      setWorkoutTitle(workout.title);
      setWorkoutDescription(workout.description);
    }
  }, [workout, setWorkoutTitle, setWorkoutDescription]);

  const handleSave = async () => {
    if (!validateForm()) return;
    await handleSaveWorkout(workoutTitle, workoutDescription);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={workout ? 'Редактирование тренировки' : 'Сохранение тренировки'}
      size="md"
      centered
    >
      <TextInput
        label="Название тренировки"
        value={workoutTitle}
        onChange={(e) => {
          setWorkoutTitle(e.target.value);
          setFormErrors((prev) => ({ ...prev, title: '' }));
        }}
        placeholder="Введите название"
        required
        mb="md"
        error={formErrors.title}
      />
      <TextInput
        label="Описание тренировки"
        value={workoutDescription}
        onChange={(e) => {
          setWorkoutDescription(e.target.value);
          setFormErrors((prev) => ({ ...prev, description: '' }));
        }}
        placeholder="Введите описание"
        mb="md"
        error={formErrors.description}
      />
      <div className={classes.saveModalActivity}>
        <Button onClick={handleSave} fullWidth>
          {workout ? 'Сохранить изменения' : 'Сохранить'}
        </Button>
        <Tooltip
          label="Вы сможете использовать план тренировки один раз. При выборе данной опции план не сохранится"
          w={220}
          multiline
          withArrow
          transitionProps={{ duration: 200 }}
        >
          <Button onClick={() => handleUseOnce(workoutTitle)} fullWidth variant="outline">
            Использовать один раз
          </Button>
        </Tooltip>
      </div>
    </Modal>
  );
};

export default WorkoutSaveModal;