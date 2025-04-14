import { UseFormReturn } from "react-hook-form";
import { exerciseFormData } from "@flow/schemes";

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';


export type CustomizablePart = {
  name: string;
  color: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string; 
  reward: number;
};

export type UserAvatar = {
  bodyType: 'slim' | 'muscular' | 'average' | 'thick';
  head: CustomizablePart;
  hair: CustomizablePart;
  nose: CustomizablePart;
  eyes: CustomizablePart;
  eyebrow: CustomizablePart;
  top: CustomizablePart;
  bottom: CustomizablePart;
  shoes: CustomizablePart;
} & Partial<{
  face: CustomizablePart;
  facialhair: CustomizablePart;
  glasses: CustomizablePart;
  hat: CustomizablePart;
  accessories: CustomizablePart[];
  outfit: CustomizablePart;
}>;

export interface User {
  id: string;
  name: string;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  goal: 'strength' | 'weight_loss' | 'endurance';
  avatar: UserAvatar;
  proteinsCoins: number;
  achievements: Achievement[];
  completedWorkouts: number;
  unlockedItems: Record<keyof UserAvatar, string[]>;
  experience: number;
  level: number;
  lastWorkoutDate?: Date;
  workoutIntensity?: number;
  hunger: number;
  thirst: number;
  lastUpdateTime: number | undefined;
  workoutHistory: { date: Date; intensity: number }[] | [];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'Вес' | 'Количество' | 'Время';
  measurementUnit: string;
  defaultValue: number;
  maxRecommended: number;
  difficulty: DifficultyLevel;
  equipment: string[];
  tags: string[];
  instructions: string;
  image?: string | Blob; 

}

export interface Workout {
  id: string;
  title: string;
  description: string;
  exercises: WorkoutExercise[];
  tags: string[];
  difficulty: DifficultyLevel;
}

export interface WorkoutExercise extends Exercise {
  uniqId: string;
  target: number;
  order: number;
}

export type customizationItem = {
  name: string; 
};

export type customizationGroup = {
  name: string;
  position: number; 
  items: customizationItem[]; 
};

export interface FormFieldProps {
  form: UseFormReturn<exerciseFormData>;
}


