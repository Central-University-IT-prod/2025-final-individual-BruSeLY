import { Button } from '@mantine/core';
import { IconEdit, IconShoppingBag, IconLaurelWreathFilled } from '@tabler/icons-react';
import classes from './UserActions.module.css';

interface UserActionsProps {
  onEditClick: () => void;
  onShopClick: () => void;
  onAchievementsClick: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onEditClick, onShopClick, onAchievementsClick }) => (
  <div className={classes.buttonContainer}>
    <Button
      leftSection={<IconEdit size={16} />}
      onClick={onEditClick}
      variant='light'
      color='blue'
    >
      Редактировать
    </Button>
    <Button
      leftSection={<IconShoppingBag size={16} />}
      onClick={onShopClick}
      variant='light'
      color='yellow'
    >
      Магазин
    </Button>
    <Button
      leftSection={<IconLaurelWreathFilled size={16} />}
      onClick={onAchievementsClick}
      variant="light"
      color='pink'
    >
      Достижения
    </Button>
  </div>
);

export default UserActions;