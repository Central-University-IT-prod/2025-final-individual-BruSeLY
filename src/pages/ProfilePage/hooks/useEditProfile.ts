import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { createUserSchema } from '../../../flow/schemes';
import { useUserStore } from '../../../flow/store/UserStore';
import { getTopModelByIntensity } from '../../../flow/utils';
import { User } from '../../../flow/types';


export const useEditProfile = (opened: boolean, onClose: () => void) => {
  const { user, updateUser } = useUserStore();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
  });

  const { reset, setValue } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        gender: user.gender,
      });
    }
  }, [user, opened, reset]);

  const handleNumberChange = (field: 'height' | 'weight') => 
    (value: string | number) => setValue(field, Number(value));
  
  const handleSelectChange = (field: 'goal' | 'gender') => 
    (value: string | null) => setValue(field, value as any);

  const handleSubmit = (values: z.infer<typeof createUserSchema>) => {
    if (!user) return;

    const avatarModel = getTopModelByIntensity(values.gender, user.workoutIntensity || 0);

    const updatedUnlockedItems = {
      ...user.unlockedItems,
      top: user.unlockedItems.top.includes(avatarModel)
        ? user.unlockedItems.top 
        : [...user.unlockedItems.top, avatarModel],
    };

    const updatedUser: User = {
      ...user,
      ...values,
      avatar: {
        ...user.avatar,
        top: { name: avatarModel, color: user.avatar.top.color },
      },
      unlockedItems: updatedUnlockedItems,
    };

    updateUser(updatedUser);
    onClose();
  };

  return {
    form,
    handleNumberChange,
    handleSelectChange,
    handleSubmit,
    user,
  };
};