import { useState } from 'react';
import { addWorkoutSchema } from '@/flow/schemes';

export const useWorkoutForm = (initialTitle = '', initialDescription = '') => {
  const [workoutTitle, setWorkoutTitle] = useState(initialTitle);
  const [workoutDescription, setWorkoutDescription] = useState(initialDescription);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const validationResult = addWorkoutSchema.safeParse({
      title: workoutTitle,
      description: workoutDescription,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      setFormErrors({
        title: errors.title?.[0] || '',
        description: errors.description?.[0] || '',
      });
      return false;
    }

    setFormErrors({});
    return true;
  };

  return {
    workoutTitle,
    setWorkoutTitle,
    workoutDescription,
    setWorkoutDescription,
    formErrors,
    setFormErrors,
    validateForm,
  };
};