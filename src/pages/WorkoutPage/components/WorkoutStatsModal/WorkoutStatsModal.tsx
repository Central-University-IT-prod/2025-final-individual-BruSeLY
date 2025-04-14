import { Modal, Text, Button, Group, Title, Stack, Tooltip } from '@mantine/core';
import { IconCheck, IconClock, IconRepeat, IconCoin, IconTrendingUp, IconAlertCircle } from '@tabler/icons-react';
import ExerciseStatsAccordion from '../ExerciseStatsAccordion/ExerciseStatsAccordion';
import { formatDuration, getRewardMultiplier } from '@/flow/utils';
import { useUserStore } from '@/flow/store/UserStore';

interface WorkoutStatsModalProps {
  opened: boolean;
  onClose: () => void;
  workoutDuration: number;
  totalReps: number;
  experienceGained: number;
  coinsGained: number;
  exerciseStats: Array<{
    title: string;
    repetitions: number;
    timeSpent: number;
  }>;
}

const WorkoutStatsModal = ({
  opened,
  onClose,
  workoutDuration,
  totalReps,
  experienceGained,
  coinsGained,
  exerciseStats,
}: WorkoutStatsModalProps) => {
  const { user } = useUserStore();
  const hunger = user ? user.hunger : 0
  const thrist = user ? user.thirst : 0

  const rewardMultiplier = getRewardMultiplier(hunger, thrist);
  const isRewardReduced = rewardMultiplier < 1;

  const finalCoins = Math.ceil(coinsGained * rewardMultiplier);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <IconCheck size={24} color="green" />
          <Title order={3}>Поздравляем! 🎉</Title>
        </Group>
      }
      centered
      size="md"
      radius="md"
      padding="xl"
    >
      <Text size="lg" mb="xl">
        Вы успешно завершили тренировку! 🏋️‍♂️
      </Text>

      <Stack>
        <Group>
          <IconClock size={24} color="blue" />
          <Text size="md">Длительность: {formatDuration(workoutDuration)}</Text>
        </Group>

        <Group>
          <IconRepeat size={24} color="orange" />
          <Text size="md">Всего повторений: {totalReps}</Text>
        </Group>

        <Group>
          <IconTrendingUp size={24} color="teal" />
          <Text size="md">Получено опыта: {Math.ceil(experienceGained * rewardMultiplier)}</Text>
          <Tooltip
              label="Ваша награда была уменьшена из-за низкого уровня голода или жажды."
              withArrow
              position="right"
            >
            <IconAlertCircle size={24} color="orange" />
          </Tooltip>
        </Group>

        <Group>
          <IconCoin size={24} color="gold" />
          <Text size="md">Получено монет: {finalCoins}</Text>
          {isRewardReduced && (
            <Tooltip
              label="Ваша награда была уменьшена из-за низкого уровня голода или жажды."
              withArrow
              position="right"
            >
              <IconAlertCircle size={24} color="orange" />
            </Tooltip>
          )}
        </Group>

        <ExerciseStatsAccordion stats={exerciseStats} />
      </Stack>

      <Button
        fullWidth
        size="lg"
        color="teal"
        onClick={onClose}
        radius="md"
        variant="light"
        mt="xl"
      >
        Закрыть
      </Button>
    </Modal>
  );
};

export default WorkoutStatsModal;