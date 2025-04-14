import { FormFieldProps } from '@/flow/types';
import { TIME_UNITS } from '@/pages/ExcercisesPage/constants';
import { Select, NumberInput } from '@mantine/core';

export const MeasurementFields: React.FC<FormFieldProps> = ({ form }) => {
  const { formState: { errors }, setValue, watch } = form;
  const selectedType = watch('type');
  const currentDefaultValue = watch('defaultValue');
  const currentMaxValue = watch('maxRecommended');
  const currentUnit = watch('measurementUnit');

  return (
    <>
      {selectedType === 'Время' && (
        <Select
          label="Единицы измерения времени"
          placeholder="Выберите единицы"
          data={TIME_UNITS}
          value={currentUnit}
          onChange={(value) => setValue('measurementUnit', value as string)}
          error={errors.measurementUnit?.message}
          size="md"
          mb="md"
        />
      )}
      <NumberInput
        label="Целевое значение"
        placeholder="Введите целевое значение"
        defaultValue={currentDefaultValue}
        value={currentDefaultValue}
        onChange={(value) => setValue('defaultValue', Number(value))}
        error={errors.defaultValue?.message}
        size="md"
        mb="md"
        min={0}
        max={99999}
      />
      <NumberInput
        label="Максимально допустимое значение"
        placeholder="Введите максимальное значение"
        defaultValue={currentMaxValue}
        value={currentMaxValue}
        onChange={(value) => setValue('maxRecommended', Number(value))}
        error={errors.maxRecommended?.message}
        size="md"
        mb="md"
        min={0}
        max={99999}
      />
    </>
  );
};