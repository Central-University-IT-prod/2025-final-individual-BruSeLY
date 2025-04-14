import { create } from 'zustand';
import { Workout } from '../types';
import { IndexedDBStorage } from '../storage/IndexDbStorage';
import { sampleWorkouts as initialWorkouts } from '../constants';
import { v4 as uuidv4 } from 'uuid';

const workoutDB = new IndexedDBStorage('workout-db', 'workouts');

interface WorkoutStore {
  workouts: Workout[];
  activeWorkout: Workout | null;
  loadWorkouts: () => Promise<void>;
  createWorkout: (workout: Workout) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  startWorkout: (workoutId: string) => void;
  initializeDB: () => Promise<void>;
  getWorkoutById: (id: string) => Workout | undefined;
  updateWorkout: (workout: Workout) => Promise<void>;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],
  activeWorkout: null,

  initializeDB: async () => {
    try {
      const workouts = await workoutDB.getAll<Workout>();
      if (workouts.length === 0) {
        await Promise.all(initialWorkouts.map((w) => workoutDB.add(w)));
        set({ workouts: initialWorkouts });
      } else {
        set({ workouts });
      }
    } catch (error) {
      console.error('Ошибка при инициализации базы данных:', error);
    }
  },

  loadWorkouts: async () => {
    try {
      const workouts = await workoutDB.getAll<Workout>();
      set({ workouts });
    } catch (error) {
      console.error('Ошибка при загрузке тренировок:', error);
    }
  },

  createWorkout: async (workout) => {
    const newWorkout: Workout = {
      ...workout,
      id: uuidv4(),
    };

    try {
      await workoutDB.add(newWorkout);
      set((state) => ({ workouts: [...state.workouts, newWorkout] }));
    } catch (error) {
      console.error('Ошибка при создании тренировки:', error);
    }
  },

  deleteWorkout: async (id) => {
    try {
      await workoutDB.delete(id);
      set((state) => ({
        workouts: state.workouts.filter((w) => w.id !== id),
      }));
    } catch (error) {
      console.error('Ошибка при удалении тренировки:', error);
    }
  },

  startWorkout: (workoutId) => {
    const workout = get().workouts.find((w) => w.id === workoutId);
    if (workout) set({ activeWorkout: workout });
  },

  getWorkoutById: (id) => {
    return get().workouts.find((w) => w.id === id);
  },

  updateWorkout: async (workout) => {
    try {
      await workoutDB.update(workout);
      set((state) => ({
        workouts: state.workouts.map((w) =>
          w.id === workout.id ? workout : w
        ),
      }));
    } catch (error) {
      console.error('Ошибка при обновлении тренировки:', error);
    }
  },
}));