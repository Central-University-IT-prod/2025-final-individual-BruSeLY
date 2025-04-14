export const EXERCISE_TYPES = [
  { value: 'Вес', label: 'Вес' },
  { value: 'Время', label: 'Время' },
  { value: 'Количество', label: 'Количество' },
] as const;

export const TIME_UNITS = [
  { value: 'сек', label: 'Секунды' },
  { value: 'мин', label: 'Минуты' },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: 'beginner', label: 'Начальный' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
] as const;

export const EQUIPMENT_OPTIONS = ['Штанга', 'Гантели', 'Скакалка', 'Коврик', 'Турник'] as const;
export const TAG_OPTIONS = ['Ноги', 'Спина', 'Кардио', 'Силовая', 'Пресс'] as const;