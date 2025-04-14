import { Exercise, WorkoutExercise } from "@/flow/types";
import { Flex, Text } from "@mantine/core";
import { IconWeight, IconClock, IconRepeat } from "@tabler/icons-react";

interface ExerciseTargetProps {
  exercise: Exercise;
  workoutExercise: WorkoutExercise;
}

const ExerciseTarget: React.FC<ExerciseTargetProps> = ({ exercise, workoutExercise }) => {
  const targetTypes = {
    'Вес': {
      icon: <IconWeight size={20} color="#4dabf7" />,
      label: 'Вес',
      unit: 'кг'
    },
    'Время': {
      icon: <IconClock size={20} color="#69db7c" />,
      label: 'Время',
      unit: 'сек'
    },
    'Количество': {
      icon: <IconRepeat size={20} color="#ffa94d" />,
      label: 'Повторения',
      unit: ''
    }
  };

  const targetType = targetTypes[exercise.type];
  if (!targetType) return null;

  return (
    <Flex align="center" gap="sm" mb="md">
      {targetType.icon}
      <Text size="lg">
        {targetType.label}: <strong>{workoutExercise.target}{targetType.unit}</strong>
      </Text>
    </Flex>
  );
};

export default ExerciseTarget;