import { create } from 'zustand';
import { Exercise } from '../types';
import { exercises as initialExercises } from '../constants';
import { IndexedDBStorage } from '../storage/IndexDbStorage';

const db = new IndexedDBStorage('exercise-db', 'exercises');

interface ExerciseStore {
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => Promise<void>;
  updateExercise: (exercise: Exercise) => Promise<void>;
  removeExercise: (id: string) => Promise<void>;
  loadExercises: () => Promise<void>;
  initializeDB: () => Promise<void>;
  getExerciseById: (id: string) => Exercise | undefined;
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],

  initializeDB: async () => {
    try {
      const exercises = await db.getAll<Exercise>();
      if (exercises.length === 0) {
        await Promise.all(initialExercises.map((ex) => db.add(ex)));
        set({ exercises: initialExercises });
      } else {
        set({ exercises });
      }
    } catch (error) {
      console.error('Failed to initialize DB:', error);
    }
  },

  loadExercises: async () => {
    try {
      const exercises = await db.getAll<Exercise>();
      set({ exercises });
    } catch (error) {
      console.error('Failed to load exercises:', error);
    }
  },

  addExercise: async (exercise) => {
    try {
      await db.add(exercise);
      set((state) => ({ exercises: [...state.exercises, exercise] }));
    } catch (error) {
      console.error('Failed to add exercise:', error);
    }
  },

  removeExercise: async (id) => {
    try {
      await db.delete(id);
      set((state) => ({
        exercises: state.exercises.filter((ex) => ex.id !== id),
      }));
    } catch (error) {
      console.error('Failed to remove exercise:', error);
    }
  },

  updateExercise: async (exercise) => {
    try {
      await db.update(exercise);
      set((state) => ({
        exercises: state.exercises.map((ex) =>
          ex.id === exercise.id ? exercise : ex
        ),
      }));
    } catch (error) {
      console.error('Failed to update exercise:', error);
    }
  },

  getExerciseById: (id) => {
    return get().exercises.find((ex) => ex.id === id);
  },
}));