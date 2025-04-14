import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { showNotification } from '@mantine/notifications';
import { useExerciseStore } from '@/flow/store/ExercisesStore';
import { exerciseFormData, exerciseSchema } from '@/flow/schemes';
import { Exercise } from '@/flow/types';

export const useExerciseForm = (exercise: Exercise | undefined, onClose: () => void) => {
  const { addExercise, updateExercise } = useExerciseStore();

  const form = useForm<exerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    mode: 'onChange',
  });

 

  const { setValue, watch, reset, handleSubmit } = form;
  const selectedType = watch('type');
  useEffect(() => {
    if (exercise) {
      Object.entries(exercise).forEach(([key, value]) => {
        if (key !== 'defaultValue' && key !== 'maxRecommended') {
          setValue(key as keyof exerciseFormData, value);
        }
      });
      setValue('defaultValue', Number(exercise.defaultValue));
      setValue('maxRecommended', Number(exercise.maxRecommended));
    }
  }, [exercise, setValue]);
  useEffect(() => {
    if (exercise) {
      Object.entries(exercise).forEach(([key, value]) => {
        if (key !== 'defaultValue' && key !== 'maxRecommended') {
          setValue(key as keyof exerciseFormData, value);
        }
      });
      setValue('defaultValue', Number(exercise.defaultValue));
      setValue('maxRecommended', Number(exercise.maxRecommended));
    }
  }, [exercise, setValue]);
  useEffect(() => {
    const measurementUnits = {
      'Вес': 'кг',
      'Время': 'сек',
      'Количество': 'повт.'
    };
    setValue('measurementUnit', measurementUnits[selectedType]);
  }, [selectedType, setValue]);

  useEffect(() => {
    if (exercise) {
      reset({
        difficulty: exercise.difficulty,
        equipment: exercise.equipment,
        tags: exercise.tags,
        type: exercise.type,
        instructions: exercise.instructions,
        defaultValue: Number(exercise.defaultValue),
        maxRecommended: Number(exercise.maxRecommended),
        measurementUnit: exercise.measurementUnit,
        title: exercise.title,
        description: exercise.description,
        image: exercise.image,
      });
    }
  }, [exercise, reset]);

  const onSubmit = useCallback(async (data: exerciseFormData) => {

    const newExercise: Exercise = {
      ...data,
      id: exercise?.id || uuidv4(),
    };

    try {
      if (exercise) {
        await updateExercise(newExercise);
      } else {
        await addExercise(newExercise);
      }
      onClose();
      reset();
    } catch (error) {
      showNotification({
        title: 'Ошибка',
        message: 'Не удалось сохранить упражнение. Пожалуйста, попробуйте снова.',
        color: 'red',
      });
    }
  }, [exercise, addExercise, updateExercise, onClose, reset]);

  const onError = () => {
    showNotification({
      title: 'Ошибка валидации',
      message: 'Пожалуйста, проверьте правильность заполнения формы',
      color: 'red',
    });
  };

  return { 
    form, 
    selectedType,
    handleFormSubmit: handleSubmit(onSubmit, onError)
  };
};
