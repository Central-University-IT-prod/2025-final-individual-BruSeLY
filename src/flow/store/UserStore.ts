import { create } from 'zustand';
import { IndexedDBStorage } from '@flow/storage/IndexDbStorage';
import { UserAvatar, User, CustomizablePart, DifficultyLevel, Workout } from '@flow/types';
import { customizationCategories, customizationGroups, initialAchievements } from '@flow/constants';
import { calculateAverageIntensity, calculateWorkoutIntensity, getInitialUnlockedItems, getRandomColor, getRewardMultiplier, getTopModelByIntensity } from '@flow/utils';
import { useExerciseStore } from './ExercisesStore';
import { showNotification } from '@mantine/notifications';

const db = new IndexedDBStorage('user-db', 'user');

interface UserStore {
  user: User | null;
  categories: string[];
  currentCategory: keyof UserAvatar;
  isCaseOpened: boolean;
  loadUser: () => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
  getUser: () => User | null;
  setCategory: (category: keyof UserAvatar) => void;
  updateAvatarPart: (key: keyof UserAvatar, part: Partial<CustomizablePart>) => void;
  openCase: (category: keyof UserAvatar, caseCost: number) => void;
  setIsCaseOpened: (value: boolean) => void;
  addExperience: (amount: number) => void;
  addCoins: (amount: number) => void;
  levelUp: () => void;
  setLastWorkoutDate: (date: Date) => void; 
  setWorkoutIntensity: (intensity: number) => void; 
  completeWorkout: (difficulty: DifficultyLevel, workout: Workout, coins: number) => void; 
  updateAchievementProgress: (achievementId: string, progress: number) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  categories: customizationCategories,
  currentCategory: 'top',
  isCaseOpened: false,

  loadUser: async () => {
    try {
      const users = await db.getAll<User>();
      if (users.length > 0) {
        set({ user: users[0] });
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = {
        ...userData,
        unlockedItems: getInitialUnlockedItems(userData.avatar),
        achievements: initialAchievements,
        experience: 0,
        level: 1,
      };
      await db.add(newUser);
      set({ user: newUser });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  },

  updateUser: async (userData,) => {
    try {
      const currentUser = get().user;
      if (!currentUser) throw new Error('User not found');
  
      const updatedUser = { ...currentUser, ...userData };
  
      if ('workoutIntensity' in userData) {
        const workoutHistory = updatedUser.workoutHistory || [];
        const averageIntensity = calculateAverageIntensity(workoutHistory);
        const topModel = getTopModelByIntensity(updatedUser.gender, averageIntensity);
  
        updatedUser.avatar = {
          ...updatedUser.avatar,
          top: { 
            ...updatedUser.avatar.top, 
            name: topModel 
          }
        };
      }
  
      await db.update(updatedUser);
      set({ user: updatedUser });
  
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  },

  getUser: () => get().user,

  setCategory: (category) => {
    set({ currentCategory: category });
  },

  updateAvatarPart: (key, part) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
  
    if (part.name === '') {
      const currentPart = currentUser.avatar[key] as CustomizablePart | undefined;
      const updatedAvatar = {
        ...currentUser.avatar,
        [key]: { 
          name: '', 
          color: currentPart?.color || '#000000' 
        },
      };
  
      const updatedUser = {
        ...currentUser,
        avatar: updatedAvatar,
      };
  
      set({ user: updatedUser });
      db.update(updatedUser);
      return;
    }
  
    if (key !== 'top') {
      const unlockedItems = currentUser.unlockedItems[key];
      if (!unlockedItems.includes(part.name || '')) {
        return;
      }
    }
  
    const currentPart = currentUser.avatar[key] as CustomizablePart | undefined;
    const updatedPart = {
      name: currentPart?.name || '',
      color: part.color || currentPart?.color || '#000000',
      ...part,
    };
  
    const updatedAvatar = {
      ...currentUser.avatar,
      [key]: updatedPart,
    };
  
    const updatedUser = {
      ...currentUser,
      avatar: updatedAvatar,
    };
  
    set({ user: updatedUser });
    db.update(updatedUser);
  },

  openCase: (category, caseCost) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
    if (category === 'top') return;
  
    const group = customizationGroups.find((g) => g.name.toLowerCase() === category);
    if (!group) return;
  
    const avatarPart = currentUser.avatar[category];
  
    if (avatarPart && typeof avatarPart === 'object' && !Array.isArray(avatarPart)) {
      const availableItems = group.items.filter(
        (item) => !currentUser.unlockedItems[category].includes(item.name)
      );
  
      if (availableItems.length === 0) return;
  
      if (currentUser.proteinsCoins < caseCost) return;
  
      const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
      const randomColor = getRandomColor();
  
      set({ isCaseOpened: true });
  
      setTimeout(() => {
        const updatedAvatar = {
          ...currentUser.avatar,
          [category]: { name: randomItem.name, color: randomColor },
        };
  
        const updatedUnlockedItems = {
          ...currentUser.unlockedItems,
          [category]: [...currentUser.unlockedItems[category], randomItem.name],
        };
  
        const updatedUser = {
          ...currentUser,
          avatar: updatedAvatar,
          unlockedItems: updatedUnlockedItems,
          proteinsCoins: currentUser.proteinsCoins - caseCost,
        };
  
        set({ user: updatedUser });
        db.update(updatedUser);
  
        if (!currentUser.achievements.find((a) => a.id === 'open-first-chest')?.progress) {
          get().updateAchievementProgress('open-first-chest', 1);
        }
  
        if (category === 'hair') {
          get().updateAchievementProgress('unlock-full-hair', 1);
        }
  
        set({ isCaseOpened: false });
      }, 2000);
    }
  },

  setIsCaseOpened: (value) => {
    set({ isCaseOpened: value });
  },

  addExperience: (amount) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
    const updatedUser = {
      ...currentUser,
      experience: currentUser.experience + amount,
    };
    set({ user: updatedUser });
    db.update(updatedUser);
    get().levelUp();
  },

  addCoins: (amount) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
  
    const newBalance = currentUser.proteinsCoins + amount;
    const updatedUser = {
      ...currentUser,
      proteinsCoins: newBalance,
    };
  
    set({ user: updatedUser });
    db.update(updatedUser).catch((error) => {
      console.error('Failed to update user in DB:', error);
    });
  },

  levelUp: () => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');

    const experienceThreshold = currentUser.level * 100; 
    if (currentUser.experience >= experienceThreshold) {
      const updatedUser = {
        ...currentUser,
        level: currentUser.level + 1,
        experience: 0, 
      };

      set({ user: updatedUser });
      db.update(updatedUser);
    }
  },

  setLastWorkoutDate: (date) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');

    const updatedUser = {
      ...currentUser,
      lastWorkoutDate: date,
    };

    set({ user: updatedUser });
    db.update(updatedUser);
  },

  setWorkoutIntensity: (intensity) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');

    const updatedUser = {
      ...currentUser,
      workoutIntensity: intensity,
    };

    set({ user: updatedUser });
    db.update(updatedUser);
  },
  completeWorkout: (difficulty, workout, coins) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
  
    const intensity = calculateWorkoutIntensity(difficulty, workout);
    const isFirstWorkout = !currentUser.workoutHistory || currentUser.workoutHistory.length === 0;
  
    const updatedWorkoutHistory = [
      ...(currentUser.workoutHistory || []),
      { date: new Date(), intensity },
    ];
  
    let updatedUser = { ...currentUser, workoutHistory: updatedWorkoutHistory };
  
    if (isFirstWorkout) {
      const firstWorkoutAchievement = currentUser.achievements.find(
        (a) => a.id === 'complete-first-workout'
      );
      if (firstWorkoutAchievement) {
        updatedUser.proteinsCoins += firstWorkoutAchievement.reward;
        showNotification({
          title: '🎉 Первая тренировка!',
          message: `Вы получили ${firstWorkoutAchievement.reward} монет за первую тренировку.`,
          color: 'green',
        });
      }
    }
  
    const updatedAchievements = currentUser.achievements.map((achievement) => {
      if (isFirstWorkout && achievement.id === 'complete-first-workout') {
        return {
          ...achievement,
          progress: Math.min(achievement.total, achievement.progress + 1),
        };
      }
      return achievement;
    });
  
    const { getExerciseById } = useExerciseStore.getState();
  
    const hasTimeExercise = workout.exercises.some((exercise) => {
      const exerciseDetails = getExerciseById(exercise.id);
      return exerciseDetails?.type === 'Время';
    });
  
    const updatedAchievementsWithTime = updatedAchievements.map((achievement) => {
      if (hasTimeExercise && achievement.id === 'complete-time-exercise') {
        return {
          ...achievement,
          progress: Math.min(achievement.total, achievement.progress + 1),
        };
      }
      return achievement;
    });
  
    const updatedAchievementsWith10Workouts = updatedAchievementsWithTime.map((achievement) => {
      if (updatedWorkoutHistory.length && achievement.id === 'complete-10-workouts') {
        return {
          ...achievement,
          progress: Math.min(achievement.total, achievement.progress + 1),
        };
      }
      return achievement;
    });
  
    const averageIntensity = calculateAverageIntensity(updatedWorkoutHistory);
    const topModel = getTopModelByIntensity(currentUser.gender, averageIntensity);
  
    updatedUser = {
      ...updatedUser,
      avatar: {
        ...currentUser.avatar,
        top: { ...currentUser.avatar.top, name: topModel },
      },
      workoutIntensity: averageIntensity,
      lastWorkoutDate: new Date(),
      achievements: updatedAchievementsWith10Workouts,
    };
  
    const rewardMultiplier = getRewardMultiplier(currentUser.hunger, currentUser.thirst);
    

    if (rewardMultiplier < 1.0) {
      showNotification({
        title: 'Следите за своим аватаром!',
        message: `Получение монет напрямую зависит от аппетита вашего аватара, 
        проведайте его и убедитесь, что не забыли дать ему немного протеина!`,
        color: 'yellow'
      })
    }
  
    const finalCoins = Math.ceil(coins * rewardMultiplier);
    updatedUser.proteinsCoins += finalCoins;

    set({ user: updatedUser });
    db.update(updatedUser).catch((error) => {
      console.error('Failed to update user in DB:', error);
    });
  
    const experienceThreshold = Math.ceil(updatedUser.level * rewardMultiplier * 100);
    if (updatedUser.experience >= experienceThreshold) {
      updatedUser.level += 1;
      updatedUser.experience = 0;
  
      set({ user: updatedUser });
      db.update(updatedUser).catch((error) => {
        console.error('Failed to update user in DB:', error);
      });
    }
  },

  updateAchievementProgress: (achievementId, progress) => {
    const currentUser = get().user;
    if (!currentUser) throw new Error('User not found');
  
    const updatedAchievements = currentUser.achievements.map((achievement) => {
      if (achievement.id === achievementId) {
        return {
          ...achievement,
          progress: Math.min(achievement.total, achievement.progress + progress),
        };
      }
      return achievement;
    });
  

    const updatedUser = {
      ...currentUser,
      achievements: updatedAchievements, 
    };
  
    set({ user: updatedUser });
  
    db.update(updatedUser)

    const completedAchievement = updatedAchievements.find(
      (a) => a.id === achievementId && a.progress >= a.total
    );
  
    if (completedAchievement) {
      get().addCoins(completedAchievement.reward);
      showNotification({
        title: '🎉 Ачивка получена!',
        message: `Вы выполнили ачивку "${completedAchievement.title}" и получили ${completedAchievement.reward} монет`,
        color: 'teal',
      });
    }
  },
}));