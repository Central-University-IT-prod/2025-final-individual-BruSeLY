import { Button, Collapse, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import classes from '../../WorkoutPage.module.css';

interface ExerciseInstructionsProps {
  showInstructions: boolean;
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>;
  instructions: string;
}

export const ExerciseInstructions: React.FC<ExerciseInstructionsProps> = ({
  showInstructions,
  setShowInstructions,
  instructions,
}) => {
  return (
    <>
      <Button
        variant="subtle"
        leftSection={<IconInfoCircle size={16} />}
        onClick={() => setShowInstructions((prev) => !prev)}
        mb="md"
      >
        {showInstructions ? 'Скрыть инструкции' : 'Показать инструкции'}
      </Button>
      <Collapse in={showInstructions}>
        <Text className={classes.instructions} p="12" mb="md">
          {instructions}
        </Text>
      </Collapse>
    </>
  );
};