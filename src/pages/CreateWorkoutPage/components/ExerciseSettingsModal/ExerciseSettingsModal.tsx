import { Modal, TextInput, Button, Select, NumberInput } from '@mantine/core';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { WorkoutExercise } from '@/flow/types';

interface ExerciseSettingsModalProps {
  exercise: WorkoutExercise | null;
  onClose: () => void;
  onSave: (updatedExercise: WorkoutExercise) => void;
}

const ExerciseSettingsModal: React.FC<ExerciseSettingsModalProps> = ({
  exercise,
  onClose,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState<number>(exercise?.target || 0);
  const [timeUnit, setTimeUnit] = useState<'seconds' | 'minutes'>('seconds');
  
  useEffect(() => {
    if (exercise) {
      setInputValue(exercise.target);
    }
  }, [exercise]);

  const handleSave = () => {
    if (!exercise) return;

    let finalValue = inputValue;

    if (exercise.type === 'Время' && timeUnit === 'minutes') {
      finalValue = inputValue * 60; 
    }

    if (finalValue < 1) {
      notifications.show({
        title: 'Ошибка',
        message: 'Значение не может быть меньше 1',
        color: 'red',
      });
      return;
    }

    if (finalValue > (exercise.maxRecommended || 0)) {
      notifications.show({
        title: 'Предупреждение',
        message: 'Вы ввели слишком большое значение. Убедитесь, что это правильно.',
        color: 'yellow',
      });
    }

    const updatedExercise: WorkoutExercise = {
      ...exercise,
      target: finalValue,
    };

    onSave(updatedExercise);
    onClose();
  };

  if (!exercise) return null;

  return (
    <Modal opened={!!exercise} onClose={onClose} title="Настройка упражнения" size="md" centered>
      <div>
        <TextInput label="Название упражнения" value={exercise.title} disabled />
        {exercise.type === 'Количество' && (
          <NumberInput
            label="Количество повторений"
            value={inputValue}
            onChange={(value) => setInputValue(typeof value === 'number' ? value : 0)}
            min={1}
            max={exercise.maxRecommended}
          />
        )}
        {exercise.type === 'Время' && (
          <div>
            <NumberInput
              label={`Время выполнения (${timeUnit === 'seconds' ? 'сек' : 'мин'})`}
              value={timeUnit === 'seconds' ? inputValue : inputValue / 60}
              onChange={(value) => setInputValue(typeof value === 'number' ? value : 0)}
              min={1}
              max={exercise.maxRecommended / (timeUnit === 'seconds' ? 1 : 60)}
            />
            <Select
              label="Единица измерения"
              value={timeUnit}
              onChange={(value) => setTimeUnit(value as 'seconds' | 'minutes')}
              data={[
                { value: 'seconds', label: 'Секунды' },
                { value: 'minutes', label: 'Минуты' },
              ]}
              mt="sm"
            />
          </div>
        )}
        {exercise.type === 'Вес' && (
          <NumberInput
            label="Вес (кг)"
            value={inputValue}
            onChange={(value) => setInputValue(typeof value === 'number' ? value : 0)}
            min={1}
            max={exercise.maxRecommended}
          />
        )}
        <Button onClick={handleSave} fullWidth mt="md">
          Сохранить
        </Button>
      </div>
    </Modal>
  );
};

export default ExerciseSettingsModal;