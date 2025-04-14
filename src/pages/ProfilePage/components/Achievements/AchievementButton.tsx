import { Button } from '@mantine/core';
import { IconLaurelWreathFilled } from '@tabler/icons-react';
import classes from './Achievements.module.css'

interface AchievementsButtonProps {
  onClick: () => void;
}

const AchievementsButton: React.FC<AchievementsButtonProps> = ({ onClick }) => {
  return (
    <Button
      className={classes.achievementsButton}
      onClick={onClick}
      variant="outline"
      leftSection={<IconLaurelWreathFilled size={16} />}
    >
      Достижения
    </Button>
  );
};

export default AchievementsButton;