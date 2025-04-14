import { BMI_COEFFICIENTS, customizationGroups, DIFFICULTY_COEFFICIENTS, GENDER_COEFFICIENTS, LOAD_WARNING_THRESHOLDS, Palette, PERSONALIZATION_COEFFICIENTS, REST_TIME_COEFFICIENTS, translationMap, userAvatar } from "../constants";
import { CustomizablePart, customizationGroup, DifficultyLevel, Exercise, User, UserAvatar, Workout, WorkoutExercise } from "../types";
import { v4 as uuidv4 } from 'uuid';

export const translateDifficulty = (level: DifficultyLevel): string => {
  switch(level) {
    case 'beginner': return 'Начинающий';
    case 'intermediate': return 'Средний';
    case 'advanced': return 'Продвинутый';
    default: 
      return '';
  }
};

export const calculateAutoTarget = (exercise: Exercise, userLevel: DifficultyLevel): number => {
  const multipliers = {
    beginner: 0.5,
    intermediate: 0.75,
    advanced: 1.0
  };
  
  return Math.round(exercise.defaultValue * multipliers[userLevel]);
};

export const calculateAverageDifficulty = (exercises: Exercise[]): DifficultyLevel => {
    const totalDifficulty = exercises.reduce(
      (sum, exercise) => sum + difficultyToNumber(exercise.difficulty),
      0
    );
  
    const averageDifficulty = totalDifficulty / exercises.length;

    if (averageDifficulty < 1.5) {
      return 'beginner';
    } else if (averageDifficulty < 2.5) {
      return 'intermediate';
    } else {
      return 'advanced';
    }
  };


export const difficultyToNumber = (difficulty: DifficultyLevel): number => {
  switch (difficulty) {
    case 'beginner':
      return 1;
    case 'intermediate':
      return 2;
    case 'advanced':
      return 3;
    default:
      return 1;
  }
};


export const calculateMaxAllowed = (
  exercise: Exercise,
): number => {
  const coefficients = {
    beginner: 1.0,
    intermediate: 0.75,
    advanced: 0.5,
  };

  return Math.round(exercise.maxRecommended * coefficients[exercise.difficulty]);
};


export const getMostFrequentTags = (exercises: Exercise[], limit: number = 3): string[] => {
  const tagFrequencyMap: { [key: string]: number } = {};

  exercises.forEach((exercise) => {
    exercise.tags.forEach((tag) => {
      if (tagFrequencyMap[tag]) {
        tagFrequencyMap[tag]++;
      } else {
        tagFrequencyMap[tag] = 1;
      }
    });
  });

  return Object.entries(tagFrequencyMap)
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, limit)
    .map(([tag]) => tag);
};


export const translateLabel = (label: string): string => {
  return translationMap[label] || label; 
};


export const calculateBMI = (weight: number, height: number): number => {
  return parseFloat((weight / Math.pow(height / 100, 2)).toFixed(2));
};

export const getBMICategory = (bmi: number): keyof typeof BMI_COEFFICIENTS => {
  if (bmi < 18.5) return 'underweight';
  if (bmi >= 18.5 && bmi < 25) return 'normal';
  if (bmi >= 25 && bmi < 30) return 'overweight';
  return 'obese';
};


export const calculateExerciseTarget = (
  exercise: Exercise,
  user: User,
  customTarget?: number
): number => {
  const { goal, height, weight, gender } = user;
  let target = exercise.defaultValue;

  target *= PERSONALIZATION_COEFFICIENTS[goal];

  target *= DIFFICULTY_COEFFICIENTS[exercise.difficulty];

  const bmi = calculateBMI(weight, height);
  const bmiCategory = getBMICategory(bmi);
  target *= BMI_COEFFICIENTS[bmiCategory];

  const genderCoefficients = GENDER_COEFFICIENTS[gender];

  if (exercise.tags.includes('Ноги')) {
    target *= genderCoefficients.legs;
  } else if (exercise.tags.includes('Кардио')) {
    target *= genderCoefficients.cardio;
  } else if (exercise.tags.includes('Силовая')) {
    target *= genderCoefficients.strength;
  }

  if (customTarget) {
    return customTarget;
  }

  return Math.round(target);
};

export const calculateWorkoutIntensity = (
  difficulty: DifficultyLevel,
  workout: Workout
): number => {
  const difficultyCoefficients = {
    beginner: 1,
    intermediate: 1.5,
    advanced: 2,
  };

  const intensity = difficultyCoefficients[difficulty];
  const exerciseCount = workout.exercises.length;
  const exerciseFactor = Math.min(exerciseCount / 4, 1); 

  const finalIntensity = intensity * (1 + exerciseFactor);
  return Math.round(Math.min(Math.max(finalIntensity, 1), 4));
};

export const calculateAverageIntensity = (
  workoutHistory: { date: Date; intensity: number }[] | undefined
): number => {
  if (!workoutHistory || workoutHistory.length === 0) return 1; 
  const totalIntensity = workoutHistory.reduce(
    (sum, workout) => sum + workout.intensity,
    0
  );

  return Math.round(totalIntensity / workoutHistory.length);
};

export const isLoadTooHigh = (
  exercise: Exercise,
  target: number
): boolean => {
  const { type, maxRecommended } = exercise;

  switch (type) {
    case 'Вес':
      return target > maxRecommended * LOAD_WARNING_THRESHOLDS.weight;
    case 'Время':
      return target > maxRecommended * LOAD_WARNING_THRESHOLDS.time;
    case 'Количество':
      return target > maxRecommended * LOAD_WARNING_THRESHOLDS.repetitions;
    default:
      return false;
  }
};

export const calculateRestTime = (
  userDifficulty: DifficultyLevel,
  defaultRest: number
): number => {
  return Math.round(defaultRest * REST_TIME_COEFFICIENTS[userDifficulty]);
};

export const autoCreateWorkout = (
  user: User,
  exercises: Exercise[],
  selectedTags: string[],
  minExercises: number = 2,
  maxExercises: number = 6
): Workout => {

  const filteredExercises = selectedTags.length > 0
    ? exercises.filter((exercise) =>
        selectedTags.some((tag) => exercise.tags.includes(tag))
      )
    : exercises;

  if (filteredExercises.length < minExercises) {
    const additionalExercises = exercises
      .filter((exercise) => !filteredExercises.includes(exercise))
      .slice(0, minExercises - filteredExercises.length);
    filteredExercises.push(...additionalExercises);
  }

  const selectedExercises = filteredExercises.slice(0, maxExercises);

  const workoutExercises: WorkoutExercise[] = selectedExercises.map((exercise) => {
    const target = calculateExerciseTarget(exercise, user);
  
    return {
      ...exercise, 
      uniqId: uuidv4(), 
      target: target,
      order: selectedExercises.indexOf(exercise) + 1,
    };
  });
  return {
    id: uuidv4(),
    title: `Персонализированная тренировка (${new Date().toLocaleDateString()})`,
    description: `Тренировка, созданная автоматически для ${user.name}`,
    exercises: workoutExercises,
    tags: selectedTags,
    difficulty: selectedExercises.some((ex) => ex.difficulty === 'advanced') ? 'advanced' : 'intermediate',
  };
};

export const getDefaultUserModel = (gender: 'male' | 'female'): UserAvatar => ({
  ...userAvatar,
  top: { name: `${capitalize(gender)}Top.001`, color: '#FF0000' },
});


export const getTopModelByIntensity = (
  gender: 'male' | 'female',
  intensity: number
): string => {
  const intensityLevel = Math.min(Math.max(intensity, 1), 4);
  return `${capitalize(gender)}Top.00${intensityLevel}`;
};

export const getCustomizationGroups = (gender: 'male' | 'female'): customizationGroup[] => {
  return customizationGroups.map((group) => {
    if (group.name === 'Top') {
      return {
        ...group,
        items: group.items.filter((item) => item.name.startsWith(capitalize(gender))),
      };
    }
    return group;
  });
};

export const getInitialUnlockedItems = (
  avatar: UserAvatar
): Record<keyof UserAvatar, string[]> => {
  const unlockedItems: Partial<Record<keyof UserAvatar, string[]>> = {};

  for (const key in avatar) {
    const typedKey = key as keyof UserAvatar;
    const value = avatar[typedKey];

    if (typedKey === 'bodyType') {
      unlockedItems.bodyType = [value as string];
    } else if (Array.isArray(value)) {
      unlockedItems[typedKey] = (value as CustomizablePart[]).map((item) => item.name);
    } else {
      unlockedItems[typedKey] = [(value as CustomizablePart).name];
    }
  }

  return unlockedItems as Record<keyof UserAvatar, string[]>;
};

export const updateUserStats = (user: User): User => {
  const now = Date.now();
  return {
    ...user,
    lastUpdateTime: now, 
  };
};

export const decreaseStatsOverTime = (user: User): User => {
  const now = Date.now();
  const lastUpdateTime = user.lastUpdateTime || now;
  const timePassed = now - lastUpdateTime;

  const decreasePerMinute = 30; 
  const minutesPassed = timePassed / (1000 * 60);

  let newHunger = user.hunger - decreasePerMinute * minutesPassed;
  let newThirst = user.thirst - decreasePerMinute * minutesPassed;

  newHunger = Math.ceil(Math.max(0, Math.min(100, newHunger)));
  newThirst = Math.ceil(Math.max(0, Math.min(100, newThirst)));

  return {
    ...user,
    hunger: newHunger,
    thirst: newThirst,
    lastUpdateTime: now,
  };
};

export const getRewardMultiplier = (hunger: number, thirst: number): number => {
  const hungerThreshold = 30;
  const thirstThreshold = 30;

  let multiplier = 1.0;

  if (hunger < hungerThreshold) {
    multiplier *= 0.75; 
  }

  if (thirst < thirstThreshold) {
    multiplier *= 0.75; 
  }

  return multiplier;
};

export const capitalize = (value: 'male' | 'female'): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const getRandomColor = (): string => {
  return Palette[Math.floor(Math.random() * Palette.length)];
};

export const animateItem = (element: HTMLElement, duration: number = 5000): void => {
  element.style.transition = `all ${duration}ms ease`;
  element.style.transform = 'scale(1.2) rotate(720deg)';
  setTimeout(() => {
    element.style.transform = 'scale(1) rotate(0deg)';
  }, duration);
};

export const formatDuration = (seconds: number) => {
  if (seconds < 60) {
    return `${Math.floor(seconds)} сек`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} мин ${remainingSeconds} сек`;
  }
};