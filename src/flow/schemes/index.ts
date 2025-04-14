import { z } from "zod";

export type createUserFormData = z.infer<typeof createUserSchema>;

export const createUserSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  height: z.coerce
    .number({
      invalid_type_error: 'Рост должен быть числом',
    })
    .min(100, 'Рост должен быть не менее 100 см')
    .max(250, 'Рост должен быть не более 250 см'),
  weight: z.coerce
    .number({
      invalid_type_error: 'Вес должен быть числом',
    })
    .min(30, 'Вес должен быть не менее 30 кг')
    .max(200, 'Вес должен быть не более 200 кг'),
  goal: z.enum(['strength', 'weight_loss', 'endurance'], {
    errorMap: () => ({ message: 'Выберите цель тренировок' }),
  }),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Выберите пол' }),
  }),
});


export type exerciseFormData = z.infer<typeof exerciseSchema>;

export const exerciseSchema = z.object({
  title: z.string().min(1, 'Название упражнения обязательно'),
  description: z.string().min(1, 'Описание упражнения обязательно'),
  type: z.enum(['Вес', 'Количество', 'Время'], {
    required_error: 'Тип упражнения обязателен',
  }),
  defaultValue: z
    .number()
    .min(1, 'Целевое значение должно быть положительным числом')
    .refine((value) => !String(value).startsWith('0'), {
      message: 'Целевое значение не может начинаться с нуля',
    }),
  maxRecommended: z
    .number()
    .min(1, 'Максимальное значение должно быть положительным числом')
    .refine((value) => !String(value).startsWith('0'), {
      message: 'Максимальное значение не может начинаться с нуля',
    }),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Сложность обязательна',
  }),
  equipment: z.array(z.string()),
  tags: z.array(z.string()).min(1, 'Выберите хотя бы один тег'),
  instructions: z.string().min(1, 'Инструкции обязательны'),
  image: z.any().optional(),
  measurementUnit: z.string().min(1, 'Единица измерения обязательна'),
});

export const addWorkoutSchema = z.object({
  title: z.string().min(1, 'Название тренировки обязательно'),
  description: z.string().min(1, 'Описание тренировки обязательно'),
});