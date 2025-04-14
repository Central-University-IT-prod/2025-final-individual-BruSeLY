import { Box, Image } from '@mantine/core';
import { useUserStore } from '../../../../flow/store/UserStore';
import { UserAvatar } from '../../../../flow/types';
import classes from './CustomizationItem.module.css';
import { useEffect, useRef } from 'react';
import { animateItem } from '../../../../flow/utils';
import { showNotification } from '@mantine/notifications';

interface Props {
  item: {
    name: string;
  };
  isActive: boolean;
  category: string;
  canDrop: boolean; 
}

const CustomizationItem: React.FC<Props> = ({ item, isActive, category, canDrop }) => {
  const imagePath = `./assets/preview/${item.name}.png`;
  const updateAvatarPart = useUserStore((state) => state.updateAvatarPart);
  const isCaseOpened = useUserStore((state) => state.isCaseOpened); 
  const user = useUserStore((state) => state.user);
  const itemRef = useRef<HTMLDivElement>(null);

  const isUnlocked = user?.unlockedItems[category as keyof UserAvatar].includes(item.name);

  const handleClick = () => {
    if (category == 'top') {
      showNotification({
        message: 'Эту модель можно изменить только тренировками.',
        color: 'yellow'
      })
      return;
    }
    if (isUnlocked) {
      updateAvatarPart(category as keyof UserAvatar, { name: item.name });
    } else {
      showNotification({
        title: 'Модель заблокирована',
        message: 'Вы не можете применить эту модель, пока она не будет разблокирована.',
        color: 'red',
      });
    }
  };

  useEffect(() => {
    if (canDrop && isCaseOpened && itemRef.current) {
      animateItem(itemRef.current, 2000); 
    }
  }, [canDrop, isCaseOpened]); 

  return (
    <Box className={classes.itemContainer} ref={itemRef}>
      <Box
        className={`${isActive ? classes.customizationItemActive : classes.customizationItem} ${
          canDrop ? classes.customizationItemGlow : ''
        } ${isUnlocked ? '' : classes.customizationItemDisabled}`} 
        onClick={handleClick}
      >
        <Image 
          src={imagePath} 
          alt={item.name} 
          width={75} 
          height={75}
          className={isUnlocked ? '' : classes.disabledImage} 
        />
      </Box>
    </Box>
  );
};

export default CustomizationItem;