import { formatDuration } from '@/flow/utils';
import { Accordion, Text, Group, Stack } from '@mantine/core';
import { IconRepeat, IconClock } from '@tabler/icons-react';

interface ExerciseStat {
  title: string;
  repetitions: number;
  timeSpent: number;
}

interface ExerciseStatsAccordionProps {
  stats: ExerciseStat[];
}

const ExerciseStatsAccordion = ({ stats }: ExerciseStatsAccordionProps) => {
  return (
    <Accordion variant="contained" radius="md">
      {stats.map((stat, index) => (
        <Accordion.Item key={index} value={`exercise-${index}`}>
          <Accordion.Control>
            <Text>{stat.title}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {stat.repetitions ? (
                <Group>
                  <IconRepeat size={18} color="orange" />
                  <Text size="sm">Повторения: {stat.repetitions}</Text>
                </Group>
              )
                :
                <Group>
                  <IconClock size={18} color="blue" />
                  <Text size="sm">Время выполнения: {formatDuration(stat.timeSpent)}</Text>
                </Group>
              }
         
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default ExerciseStatsAccordion;