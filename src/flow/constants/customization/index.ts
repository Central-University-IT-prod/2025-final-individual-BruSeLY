import { customizationGroup } from "../../types";


export const translationMap: Record<string, string> = {
  Head: 'Голова',
  Hair: 'Волосы',
  Face: 'Лицо',
  Eyes: 'Глаза',
  EyeBrow: 'Брови',
  Nose: 'Нос',
  FacialHair: 'Борода',
  Glasses: 'Очки',
  Hat: 'Шляпа',
  Top: 'Верх',
  Bottom: 'Низ',
  Shoes: 'Обувь',
  Outfit: 'Наряд',
  Accessories: 'Аксессуары',
};

export const Palette = [
  // Цвета для волос
  '#1B1B1B', // Черный (натуральный)
  '#4A3728', // Темно-коричневый (натуральный)
  '#8B4513', // Каштановый
  '#D4A017', // Светло-каштановый
  '#A17249', // Средне-коричневый
  '#DEB887', // Светлый блонд
  '#F4C430', // Золотистый блонд
  '#E6BE8A', // Песочный блонд
  '#8B8B83', // Пепельный
  '#A9A9A9', // Седой

  // Цвета для одежды
  '#000000', // Черный
  '#FFFFFF', // Белый
  '#1B4B72', // Темно-синий (джинсовый)
  '#233B6E', // Классический синий
  '#4A5E6F', // Серо-синий
  '#2F4F4F', // Темный серо-зеленый
  '#4B5320', // Оливковый
  '#614E3F', // Коричневый (кожаный)
  '#8B0000', // Темно-красный
  '#702963', // Бургунди
  '#4A4244', // Древесный уголь
  '#E8E8E8', // Светло-серый
  '#F5F5DC', // Бежевый
  '#D2B48C', // Песочный
  '#CD853F', // Светло-коричневый
  '#6B4423', // Темно-коричневый
  '#556B2F', // Темно-оливковый
  '#483D8B', // Темно-синий фиолетовый
  '#BC8F8F', // Розово-коричневый
  '#DAA520', // Золотисто-коричневый
];
export const customizationGroups: customizationGroup[] = [
  {
    name: 'Top',
    position: 1,
    items: [
      { name: 'MaleTop.001'},
      { name: 'FemaleTop.001'},
    ],
  },
  {
    name: 'Hair',
    position: 2,
    items: [
      { name: 'Hair.001'},
      { name: 'Hair.002'},
      { name: 'Hair.003'},    
      { name: 'Hair.004'},
      { name: 'Hair.005'},    
      { name: 'Hair.006'},
      { name: 'Hair.007'},
      { name: 'Hair.008'},    
      { name: 'Hair.009'},    
      { name: 'Hair.010'},
      { name: 'Hair.011'},

    ],
  },
  {
    name: 'Face',
    position: 3,
    items: [
      { name: 'Face.001' },
      { name: 'Face.002' },
      { name: 'Face.003' },
      { name: 'Face.004' },
      { name: 'Face.005' },
      { name: 'Face.006' },
      { name: 'Face.007' },

    ],
  },
  {
    name: 'Eyes',
    position: 4,
    items: [
      { name: 'Eyes.001' },
      { name: 'Eyes.002' },
      { name: 'Eyes.003' },
      { name: 'Eyes.004' },
      { name: 'Eyes.005' },
      { name: 'Eyes.006' },
      { name: 'Eyes.007'},
      { name: 'Eyes.008' },
      { name: 'Eyes.009'},
      { name: 'Eyes.010' },
      { name: 'Eyes.011'},
      { name: 'Eyes.012'},

    ],
  },
  {
    name: 'EyeBrow',
    position: 5,
    items: [
      { name: 'EyeBrow.001' },
      { name: 'EyeBrow.002' },
      { name: 'EyeBrow.003' },
      { name: 'EyeBrow.004' },
      { name: 'EyeBrow.005' },
      { name: 'EyeBrow.006' },
      { name: 'EyeBrow.007' },
      { name: 'EyeBrow.008' },
      { name: 'EyeBrow.009' },
      { name: 'EyeBrow.010' },
    ],
  },
  {
    name: 'Nose',
    position: 6,
    items: [
      { name: 'Nose.001' },
      { name: 'Nose.002' },
      { name: 'Nose.003' },
      { name: 'Nose.004' },
    ],
  },
  {
    name: 'FacialHair',
    position: 7,
    items: [
      { name: 'FacialHair.001' },
      { name: 'FacialHair.002' },
      { name: 'FacialHair.003' },
      { name: 'FacialHair.004' },
      { name: 'FacialHair.005' },
      { name: 'FacialHair.006' },
      { name: 'FacialHair.007' },
    ],
  },
  {
    name: 'Glasses',
    position: 8,
    items: [
      { name: 'Glasses.001' },
      { name: 'Glasses.002' },
      { name: 'Glasses.003' },
      { name: 'Glasses.004' },
    ],
  },
  {
    name: 'Hat',
    position: 9,
    items: [
      { name: 'Hat.001' },
      { name: 'Hat.002' },
      { name: 'Hat.003' },
      { name: 'Hat.004' },
      { name: 'Hat.005' },
      { name: 'Hat.006' },
      { name: 'Hat.007' },
    ],
  },
  {
    name: 'Shoes',
    position: 12,
    items: [
      { name: 'Shoes.001' },
      { name: 'Shoes.002' },
      { name: 'Shoes.003' },
    ],
  },
];

export const customizationCategories = customizationGroups.map(group => group.name);
