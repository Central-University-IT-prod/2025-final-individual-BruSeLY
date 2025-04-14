import { Flex, Button } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import classes from '../../WorkoutPage.module.css';

interface NavigationButtonsProps {
  isFirst: boolean;
  isLast: boolean;
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
  disableNext: boolean;
  disableSkip: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  isFirst,
  isLast,
  onBack,
  onSkip,
  onNext,
  disableNext,
  disableSkip,
}) => {
  return (
    <Flex justify="space-between" mt="md" gap="sm" className={classes.navigationButtons}>
      <Button
        className={classes.navButton}
        onClick={onBack}
        disabled={isFirst}
        leftSection={<IconArrowLeft size={16} />}
        size="sm"
      >
        Назад
      </Button>
      <Button
        className={classes.navButton}
        onClick={onSkip}
        variant="light"
        disabled={disableSkip}
        size="sm"
      >
        Пропустить
      </Button>
      <Button
        className={classes.navButton}
        onClick={onNext}
        disabled={disableNext}
        rightSection={<IconArrowRight size={16} />}
        size="sm"
      >
        {isLast ? 'Завершить' : 'Далее'}
      </Button>
    </Flex>
  );
};

export default NavigationButtons;