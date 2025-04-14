import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Select, Button, Group, Radio } from '@mantine/core';
import { useUserStore } from '../../flow/store/UserStore';
import classes from './CreateProfile.module.css';
import { createUserFormData, createUserSchema } from '../../flow/schemes';
import { v4 as uuidv4 } from 'uuid';
import { getInitialUnlockedItems, getDefaultUserModel } from '../../flow/utils';


const CreateProfilePage = () => {
  const { createUser } = useUserStore();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      gender: 'male',
    },
  });

  const onSubmit: SubmitHandler<createUserFormData> = (data) => {
    const avatar = getDefaultUserModel(data.gender);
    avatar.bodyType = 'thick';

    const unlockedItems = getInitialUnlockedItems(avatar);

    const userData = {
      id: uuidv4(),
      ...data,
      avatar,
      unlockedItems,
      proteinsCoins: 2500,
      achievements: [],
      completedWorkouts: 0,
      experience: 0,
      level: 1,
      hunger: 100,
      thirst: 100,
      lastUpdateTime: undefined,
      lastWorkoutDate: undefined,
      workoutIntensity: 0,
      workoutHistory: [],
    };
    createUser(userData);
  };

  const handleNumberInput = (field: keyof createUserFormData, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ''); 
    setValue(field, numericValue === '' ? 0 : Number(numericValue)); 
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.grid}>
            <TextInput
              radius="md"
              label="Имя"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Введите ваше имя"
              styles={{
                label: {
                  color: 'var(--mantine-color-dark-9)',
                  fontWeight: 500
                }
              }}
            />
            <TextInput
              radius="md"
              label="Рост (см)"
              {...register('height')}
              onChange={(e) => handleNumberInput('height', e.target.value)}
              error={errors.height?.message}
              placeholder="Введите ваш рост"
              styles={{
                label: {
                  color: 'var(--mantine-color-dark-9)',
                  fontWeight: 500
                }
              }}
            />
            <TextInput
              radius="md"
              label="Вес (кг)"
              {...register('weight')}
              onChange={(e) => handleNumberInput('weight', e.target.value)}
              error={errors.weight?.message}
              placeholder="Введите ваш вес"
              styles={{
                label: {
                  color: 'var(--mantine-color-dark-9)',
                  fontWeight: 500
                }
              }}
            />
            <Select
              radius="md"
              label="Цель тренировок"
              {...register('goal')}
              onChange={(value) => setValue('goal', value as 'strength' | 'weight_loss' | 'endurance')}
              error={errors.goal?.message}
              placeholder="Выберите цель"
              data={[
                { value: 'strength', label: 'Набор мышечной массы' },
                { value: 'weight_loss', label: 'Похудение' },
                { value: 'endurance', label: 'Развитие выносливости' },
              ]}
              withAsterisk
              styles={{
                label: {
                  color: 'var(--mantine-color-dark-9)',
                  fontWeight: 500
                }
              }}
            />
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Radio.Group
                  label="Пол"
                  description="Это нужно для персонализации тренировок"
                  error={errors.gender?.message}
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  styles={{
                    label: {
                      color: 'var(--mantine-color-dark-9)',
                      fontWeight: 500
                    },
                    description: {
                      color: 'var(--mantine-color-dark-6)'
                    }
                  }}
                >
                  <Group mt="md">
                    <Radio 
                      value="male" 
                      label="Мужской"
                      styles={{
                        label: {
                          color: 'var(--mantine-color-dark-9)'
                        }
                      }}
                    />
                    <Radio 
                      value="female" 
                      label="Женский"
                      styles={{
                        label: {
                          color: 'var(--mantine-color-dark-9)'
                        }
                      }}
                    />
                  </Group>
                </Radio.Group>
              )}
            />
          </div>
          <Button type="submit" fullWidth mt="md">
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfilePage;