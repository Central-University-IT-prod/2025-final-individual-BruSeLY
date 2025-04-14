import { useWorkoutStore } from '@/flow/store/WorkoutStore';
import { Workout, WorkoutExercise } from '@/flow/types';
import { calculateAverageDifficulty, getMostFrequentTags } from '@/flow/utils';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export const useWorkoutActions = (
  workout: Workout | null | undefined,
  selectedExercises: WorkoutExercise[],
  selectedTags: string[],
  onClearBoard: () => void,
  onClose: () => void
) => {
  const { createWorkout, updateWorkout } = useWorkoutStore();
  const navigate = useNavigate();

  const handleSaveWorkout = async (title: string, description: string) => {
    if (selectedExercises.length === 0) {
      notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, добавьте упражнения в тренировку',
        color: 'red',
      });
      return;
    }

    const difficulty = calculateAverageDifficulty(selectedExercises);
    const frequentTags = getMostFrequentTags(selectedExercises);
    const allTags = Array.from(new Set([...selectedTags, ...frequentTags]));

    const newWorkout: Workout = {
      id: workout?.id || uuidv4(),
      title,
      description,
      exercises: selectedExercises,
      tags: allTags,
      difficulty,
    };

    try {
      if (workout) {
        await updateWorkout(newWorkout);
        notifications.show({
          color: 'green',
          title: 'Тренировка успешно обновлена',
          message: 'Изменения сохранены',
        });
      } else {
        await createWorkout(newWorkout);
        notifications.show({
          color: 'green',
          title: 'Тренировка успешно добавлена',
          message: 'Перейдите в раздел тренировок, чтобы начать её',
        });
      }

      onClose();
      onClearBoard();
    } catch (error) {
      console.error('Ошибка при сохранении тренировки:', error);
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось сохранить тренировку',
        color: 'red',
      });
    }
  };

  const handleUseOnce = (title: string) => {
    if (selectedExercises.length === 0) {
      notifications.show({
        title: 'Ошибка',
        message: 'Пожалуйста, добавьте упражнения в тренировку',
        color: 'red',
      });
      return;
    }

    const temporaryWorkout: Workout = {
      id: 'temporary',
      title: title,
      description: 'Временная тренировка',
      exercises: selectedExercises,
      tags: selectedTags,
      difficulty: calculateAverageDifficulty(selectedExercises),
    };

    navigate('/workouts/temporary', {
      state: { workout: temporaryWorkout },
    });
  };

  return {
    handleSaveWorkout,
    handleUseOnce,
  };
};