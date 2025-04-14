import { DifficultyLevel } from "../../types";

export const PERSONALIZATION_COEFFICIENTS = {
  strength: 1.2, 
  weight_loss: 0.8, 
  endurance: 1.0, 
};


export const DIFFICULTY_COEFFICIENTS: Record<DifficultyLevel, number> = {
  beginner: 0.8,
  intermediate: 1.0,
  advanced: 1.2,
};


export const LOAD_WARNING_THRESHOLDS = {
  weight: 0.9,
  time: 0.85, 
  repetitions: 0.8, 
};

export const BMI_COEFFICIENTS = {
  underweight: 0.9, 
  normal: 1.0,
  overweight: 1.1, 
  obese: 1.2,
};

export const REST_TIME_COEFFICIENTS = {
  beginner: 1.5, 
  intermediate: 1.0, 
  advanced: 0.8, 
};

export const GENDER_COEFFICIENTS = {
  male: {
    strength: 1.2, 
    weight_loss: 1.0,
    endurance: 1.0,
    legs: 0.9,
    cardio: 0.9, 
  },
  female: {
    strength: 1.0, 
    weight_loss: 1.2, 
    endurance: 1.1, 
    legs: 1.2, 
    cardio: 1.05, 
  },
};
