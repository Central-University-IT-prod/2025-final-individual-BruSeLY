import { Exercise, Workout } from "../../types";
import { v4 as uuidv4 } from 'uuid';


export const difficultyColors = {
  beginner: { from: 'green', to: 'lime' },
  intermediate: { from: 'yellow', to: 'orange' },
  advanced: { from: 'red', to: 'pink' }
};

export const difficultyOptions = [
  { value: 'beginner', label: 'Начинающий' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
];



export const exercises: Exercise[] = [
  { 
    id: uuidv4(),
    title: "Приседания со штангой",
    type: "Вес",
    defaultValue: 40,
    maxRecommended: 180,
    measurementUnit: "кг",
    description: "Базовое упражнение для развития мышц ног",
    difficulty: "intermediate",
    equipment: ["Штанга"],
    tags: ["Ноги", "Силовая"],
    instructions: "1. Подойдите к стойке\n2. Расположите штангу на трапециях\n3. Выполните присед с прямой спиной",
    image: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Планка",
    type: "Время",
    defaultValue: 45,
    maxRecommended: 300,
    measurementUnit: "сек",
    description: "Упражнение для укрепления корпуса",
    difficulty: "beginner",
    equipment: [],
    tags: ["Корпус", "Статика"],
    instructions: "1. Примите положение упора лежа\n2. Удерживайте тело прямо\n3. Напрягите мышцы живота",
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=800'
  },
  {
    id: uuidv4(),
    title: "Становая тяга",
    type: "Вес",
    defaultValue: 60,
    maxRecommended: 220,
    measurementUnit: "кг",
    description: "Упражнение для развития мышц спины и ног",
    difficulty: "advanced",
    equipment: ["Штанга"],
    tags: ["Спина", "Ноги", "Силовая"],
    instructions: "1. Возьмите штангу прямым хватом\n2. С прямой спиной поднимите вес\n3. Контролируйте опускание",
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Берпи",
    type: "Количество",
    defaultValue: 8,
    maxRecommended: 25,
    measurementUnit: "повт.",
    description: "Кардиоупражнение для всего тела",
    difficulty: "advanced",
    equipment: [],
    tags: ["Кардио", "Все тело"],
    instructions: "1. Из положения стоя перейдите в упор лежа\n2. Выполните отжимание\n3. Рывком вернитесь в присед",
    image: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Подтягивания",
    type: "Количество",
    defaultValue: 6,
    maxRecommended: 20,
    measurementUnit: "повт.",
    description: "Упражнение для развития мышц спины",
    difficulty: "intermediate",
    equipment: ["Турник"],
    tags: ["Спина", "Силовая"],
    instructions: "1. Возьмитесь за перекладину широким хватом\n2. Подтяните тело вверх\n3. Медленно опуститесь",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Скакалка",
    type: "Время",
    defaultValue: 30,
    maxRecommended: 120,
    measurementUnit: "сек",
    description: "Кардиоупражнение для развития выносливости",
    difficulty: "beginner",
    equipment: ["Скакалка"],
    tags: ["Кардио", "Ноги"],
    instructions: "1. Вращайте скакалку запястьями\n2. Подпрыгивайте на носках\n3. Сохраняйте ритм",
    image: "https://images.unsplash.com/photo-1514994667787-b48ca37155f0?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Отжимания",
    type: "Количество",
    defaultValue: 12,
    maxRecommended: 50,
    measurementUnit: "повт.",
    description: "Базовое упражнение для груди и трицепсов",
    difficulty: "beginner",
    equipment: [],
    tags: ["Грудь", "Силовая"],
    instructions: "1. Примите упор лежа\n2. Опустите тело, сгибая локти\n3. Вернитесь в исходное положение",
    image: "https://images.unsplash.com/photo-1683192943220-d191b72a4fac?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Боковая планка",
    type: "Время",
    defaultValue: 30,
    maxRecommended: 120,
    measurementUnit: "сек",
    description: "Упражнение для косых мышц живота",
    difficulty: "intermediate",
    equipment: ["Коврик"],
    tags: ["Корпус", "Статика"],
    instructions: "1. Лягте на бок с упором на локоть\n2. Поднимите таз\n3. Удерживайте положение",
    image: "https://images.unsplash.com/photo-1588783344727-f67e17b45dfc?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Выпады",
    type: "Количество",
    defaultValue: 10,
    maxRecommended: 30,
    measurementUnit: "повт.",
    description: "Упражнение для развития мышц ног",
    difficulty: "beginner",
    equipment: [],
    tags: ["Ноги", "Баланс"],
    instructions: "1. Сделайте шаг вперед\n2. Опуститесь в выпад\n3. Вернитесь в исходное положение",
    image: "https://images.unsplash.com/photo-1616279967983-ec413476e824?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Скручивания",
    type: "Количество",
    defaultValue: 15,
    maxRecommended: 50,
    measurementUnit: "повт.",
    description: "Упражнение для мышц пресса",
    difficulty: "beginner",
    equipment: ["Коврик"],
    tags: ["Пресс", "Силовая"],
    instructions: "1. Лежа на спине согните ноги\n2. Поднимите корпус к коленям\n3. Медленно опуститесь",
    image: "https://images.unsplash.com/photo-1571019613531-fbeaeb790845?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Махи гирей",
    type: "Вес",
    defaultValue: 16,
    maxRecommended: 40,
    measurementUnit: "кг",
    description: "Упражнение для развития взрывной силы",
    difficulty: "advanced",
    equipment: ["Гири"],
    tags: ["Ноги", "Кардио"],
    instructions: "1. Наклонитесь с гирей между ног\n2. Рывком поднимите гирю до уровня груди\n3. Контролируйте опускание",
    image: "https://images.unsplash.com/photo-1597076545399-91a3ff0e71b3?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Ягодичный мостик",
    type: "Количество",
    defaultValue: 15,
    maxRecommended: 40,
    measurementUnit: "повт.",
    description: "Упражнение для ягодичных мышц",
    difficulty: "beginner",
    equipment: ["Коврик"],
    tags: ["Ноги", "Силовая"],
    instructions: "1. Лежа на спине согните ноги\n2. Поднимите таз вверх\n3. Зафиксируйте положение",
    image: "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Отжимания на брусьях",
    type: "Количество",
    defaultValue: 8,
    maxRecommended: 25,
    measurementUnit: "повт.",
    description: "Упражнение для трицепсов и груди",
    difficulty: "intermediate",
    equipment: ["Брусья"],
    tags: ["Руки", "Силовая"],
    instructions: "1. Примите упор на брусьях\n2. Опустите тело, сгибая локти\n3. Мощным движением вытолкните тело вверх",
    image: "https://images.unsplash.com/photo-1701826510567-8880c3fa1e98?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Велоспорт",
    type: "Время",
    defaultValue: 30,
    maxRecommended: 120,
    measurementUnit: "минуты",
    description: "Упражнение для укрепления мышц ног",
    difficulty: "beginner",
    equipment: [""],
    tags: ["Ноги"],
    instructions: "1. Возьмите велосипед\n2. Сядьте на велосипед\n3. Удерживайте равновесие",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800"
  },
  {
    id: uuidv4(),
    title: "Прыжки в длину",
    type: "Количество",
    defaultValue: 8,
    maxRecommended: 20,
    measurementUnit: "повт.",
    description: "Плиометрическое упражнение для ног",
    difficulty: "beginner",
    equipment: [],
    tags: ["Ноги", "Кардио"],
    instructions: "1. Из полуприседа сделайте прыжок вперед\n2. Приземлитесь на обе ноги\n3. Повторите в серии",
    image: "https://images.unsplash.com/photo-1608196678374-9e15355d0261?auto=format&fit=crop&w=800"
  }
];


export const sampleWorkouts: Workout[] = [
 {
   id: uuidv4(),
   title: "Силовая тренировка",
   description: "Комплекс для развития мышечной силы",
   difficulty: "intermediate",
   tags: ["Силовая", "Базовая"],
   exercises: [
     { ...exercises[0],
       uniqId: uuidv4(),
       target: 16,
       order: 1 
     },
     { ...exercises[3],
       uniqId: uuidv4(),
       target: 16,
       order: 2
     },
   ]
 },
 {
   id: uuidv4(),
   title: "Кардио-комплекс",
   description: "Интервальная тренировка на выносливость",
   difficulty: "beginner",
   tags: ["Кардио", "Жиросжигание"],
   exercises: [
     { ...exercises[0],
       uniqId: uuidv4(),
       target: 16,
       order: 1 
     },
     { ...exercises[7],
       uniqId: uuidv4(),
       target: 16,
       order: 3 
     },
   ],
 },
 {
  id: uuidv4(),
  title: "Упражнения на ноги",
  description: "Интервальная тренировка на выносливость",
  difficulty: "beginner",
  tags: ["Кардио", "Жиросжигание"],
  exercises: [
    { ...exercises[14],
      uniqId: uuidv4(),
      target: 60,
      order: 1 
    },
    { ...exercises[9],
      uniqId: uuidv4(),
      target: 16,
      order: 2 
    },
    { ...exercises[15],
      uniqId: uuidv4(),
      target: 5,
      order: 3
    },
  ],
}
];