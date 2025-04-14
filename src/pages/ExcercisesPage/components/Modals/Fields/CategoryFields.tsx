import { exerciseFormData } from '@/flow/schemes';
import { FormFieldProps } from '@/flow/types';
import { DIFFICULTY_LEVELS, EQUIPMENT_OPTIONS, TAG_OPTIONS } from '@/pages/ExcercisesPage/constants';
import { Select, MultiSelect } from '@mantine/core';


export const CategoryFields: React.FC<FormFieldProps> = ({ form }) => {
  const { register, formState: { errors }, setValue, watch } = form;
  const currentDifficulty = watch('difficulty');
  const currentEquipment = watch('equipment');
  const currentTags = watch('tags');

  return (
    <>
      <Select
        label="Сложность"
        placeholder="Выберите сложность"
        data={DIFFICULTY_LEVELS}
        value={currentDifficulty}
        {...register('difficulty')}
        onChange={(value) => setValue('difficulty', value as exerciseFormData['difficulty'])}
        error={errors.difficulty?.message}
        size="md"
        mb="md"
      />
      <MultiSelect
        label="Оборудование"
        placeholder="Выберите оборудование"
        data={EQUIPMENT_OPTIONS}
        value={currentEquipment}
        {...register('equipment')}
        onChange={(values) => setValue('equipment', values)}
        error={errors.equipment?.message}
        size="md"
        mb="md"
        searchable
      />
      <MultiSelect
        label="Теги"
        placeholder="Выберите теги"
        data={TAG_OPTIONS}
        {...register('tags')}
        value={currentTags}
        onChange={(values) => setValue('tags', values)}
        error={errors.tags?.message}
        size="md"
        mb="md"
        searchable
      />
    </>
  );
};
