import { Achievement, UserAvatar } from "../../types";

export const initialUnlockedItems: Record<keyof UserAvatar, string[]> = {
  bodyType: [],
  head: [],
  hair: [],
  nose: [],
  eyes: [],
  eyebrow: [],
  top: [],
  bottom: [],
  shoes: [],
  face: [],
  facialhair: [],
  glasses: [],
  hat: [],
  accessories: [],
  outfit: []
};

export const userAvatar: UserAvatar = {
  bodyType: 'average',
  top: { name: `MaleTop.001`, color: '#FF0000' },
  head: { name: 'Head.001', color: '#FFDBAC' },
  hair: { name: 'Hair.001', color: '#A52A2A' },
  nose: { name: 'Nose.001', color: '#FFDBAC' },
  eyes: { name: 'Eyes.001', color: '#000000' },
  eyebrow: { name: 'EyeBrow.001', color: '#000000' },
  bottom: { name: 'Bottom.001', color: '#0000FF' },
  shoes: { name: 'Shoes.001', color: '#808080' },
  face: { name: '', color: '' },
  facialhair: { name: '', color: '' },
  glasses: { name: '', color: '' },
  hat: { name: '', color: '' },
  accessories: [],
  outfit: { name: '', color: ''}
};


export const initialAchievements: Achievement[] = [
  {
    id: 'complete-first-workout',
    title: 'Первая тренировка',
    description: 'Завершите свою первую тренировку',
    progress: 0,
    total: 1,
    icon: 'IconTrophy',
    reward: 25
  },
  {
    id: 'complete-time-exercise',
    title: 'Упражнение на время',
    description: 'Выполните упражнение на время',
    progress: 0,
    total: 1,
    icon: 'IconClock',
    reward: 25
  },
  {
    id: 'complete-10-workouts',
    title: '10 тренировок',
    description: 'Завершите 10 тренировок',
    progress: 0,
    total: 10,
    icon: 'IconRun',
    reward: 50
  },
  {
    id: 'open-first-chest',
    title: 'Первый сундук',
    description: 'Откройте свой первый сундук',
    progress: 0,
    total: 1,
    icon: 'IconChest',
    reward: 25
  },
  {
    id: 'unlock-full-hair',
    title: 'Стиляга',
    description: 'Разблокируйте все типы волос',
    progress: 1,
    total: 11,
    icon: 'IconHair',
    reward: 150
  },
];