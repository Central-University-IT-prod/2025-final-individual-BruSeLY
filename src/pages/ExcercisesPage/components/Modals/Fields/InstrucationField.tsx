import { useCallback } from 'react';
import { Textarea } from '@mantine/core';
import { UseFormReturn } from 'react-hook-form';
import { exerciseFormData } from '@/flow/schemes';
import classes from '../Modal.module.css';

interface InstructionsFieldProps {
  form: UseFormReturn<exerciseFormData>;
  defaultValue?: string;
  minRows?: number;
  maxRows?: number;
}

export const InstructionsField: React.FC<InstructionsFieldProps> = (({ form }) => {
  const { register, setValue, formState: { errors } } = form;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('instructions', event.currentTarget.value);
  }, [setValue]);

  return (
    <div>
      <Textarea
        label="Инструкции"
        placeholder="Пошаговая инструкция выполнения..."
        {...register('instructions')}
        onChange={handleChange}
        error={errors.instructions?.message}
        size="md"
        mb="md"
        autosize
        classNames={{
          input: classes.textarea,
          label: classes.label,
          error: classes.error
        }}
      />
    </div>
  );
});
