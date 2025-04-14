import { TextInput, Textarea, Select } from '@mantine/core';
import { exerciseFormData } from '@/flow/schemes';
import { EXERCISE_TYPES } from '@/pages/ExcercisesPage/constants';
import { FormFieldProps } from '@/flow/types';

interface BasicInfoProps extends FormFieldProps {
  selectedType: string;
}

export const BasicInfoFields: React.FC<BasicInfoProps> = ({ form, selectedType }) => {
  const { register, formState: { errors }, setValue } = form;

  return (
    <>
      <TextInput
        label="Название упражнения"
        placeholder="Приседания со штангой"
        {...register('title')}
        error={errors.title?.message}
        size="md"
        mb="md"
      />
      <Textarea
        label="Описание"
        placeholder="Краткое описание упражнения"
        {...register('description')}
        error={errors.description?.message}
        size="md"
        mb="md"
        autosize
        minRows={2}
      />
      <Select
        label="Тип упражнения"
        placeholder="Выберите тип"
        data={EXERCISE_TYPES}
        value={selectedType}
        onChange={(value) => setValue('type', value as exerciseFormData['type'])}
        error={errors.type?.message}
        size="md"
        mb="md"
      />
    </>
  );
};