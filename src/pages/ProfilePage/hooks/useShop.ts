import { useCallback } from 'react';
import { useUserStore } from '../../../flow/store/UserStore';
import { showNotification } from '@mantine/notifications';

export const useShop = () => {
  const { user, updateUser } = useUserStore();

  const handleBuyItem = useCallback((item: any) => {
    if (!user || user.proteinsCoins < item.cost) {
      showNotification({
        message: 'Недостаточно монет',
        color: 'red',
      });
      return;
    }

    const updatedUser = { ...user };
    if (item.id === 'water') {
      updatedUser.thirst = Math.min(100, updatedUser.thirst + item.value);
    } else {
      updatedUser.hunger = Math.min(100, updatedUser.hunger + item.value);
    }
    updatedUser.proteinsCoins -= item.cost;
    updateUser(updatedUser);
  }, [user, updateUser]);

  return { handleBuyItem };
};