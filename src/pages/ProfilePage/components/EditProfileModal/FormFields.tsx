import { TextInput, NumberInput, Select } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { User } from '../../../../flow/types';
import { z } from 'zod';
import { createUserSchema } from '../../../../flow/schemes';

type FormData = z.infer<typeof createUserSchema>;

interface FormFieldsProps {
  form: UseFormReturn<FormData>;
  user: User | null;
  onNumberChange: (field: 'height' | 'weight') => (value: string | number) => void;
  onSelectChange: (field: 'goal' | 'gender') => (value: string | null) => void;
}

const GOALS_DATA = [
  { value: 'strength', label: 'Набор мышечной массы' },
  { value: 'weight_loss', label: 'Похудение' },
  { value: 'endurance', label: 'Развитие выносливости' },
] as const;

const GENDER_DATA = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;

const FormFields: React.FC<FormFieldsProps> = ({ form, user, onNumberChange, onSelectChange }) => {
  const { register, formState: { errors } } = form;

  return (
    <>
      <TextInput
        defaultValue={user?.name}
        label="Имя"
        placeholder="Введите ваше имя"
        {...register('name')}
        error={errors.name?.message as string}
        mb="md"
      />
      <NumberInput
        defaultValue={user?.height}
        radius="md"
        label="Рост (см)"
        {...register('height')}
        onChange={(value) => onNumberChange('height')(value)}
        error={errors.height?.message as string}
        placeholder="Введите ваш рост"
        min={100}
        max={250}
        mb="md"
      />
      <NumberInput
        radius="md"
        defaultValue={user?.weight}
        label="Вес (кг)"
        {...register('weight')}
        onChange={(value) => onNumberChange('weight')(value)}
        error={errors.weight?.message as string}
        placeholder="Введите ваш вес"
        min={30}
        max={200}
        mb="md"
      />
      <Select
        radius="md"
        defaultValue={user?.goal}
        label="Цель тренировок"
        {...register('goal')}
        onChange={(value) => onSelectChange('goal')(value)}
        error={errors.goal?.message as string}
        placeholder="Выберите цель"
        data={GOALS_DATA}
        mb="md"
      />
      <Select
        radius="md"
        defaultValue={user?.gender}
        label="Пол"
        placeholder="Выберите пол"
        data={GENDER_DATA}
        {...register('gender')}
        onChange={(value) => onSelectChange('gender')(value)}
        error={errors.gender?.message as string}
        mb="md"
      />
    </>
  );
};

export default FormFields;