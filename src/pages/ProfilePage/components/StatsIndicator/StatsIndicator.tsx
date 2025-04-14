import { Box, Group, Text } from '@mantine/core';
import { IconDroplet, IconMeat, IconCoin } from '@tabler/icons-react';
import classes from './StatsIndicator.module.css';
import React from 'react';

interface StatsIndicatorProps {
  thirst: number;
  hunger: number;
  coins: number; 
}

const StatsIndicator: React.FC<StatsIndicatorProps> = ({ thirst, hunger, coins }) => {
  return (
    <Box className={classes.statsIndicator}>
      <Group className={classes.legend}>
        <Group gap={4}>
          <IconDroplet size={16} color="#228be6" />
          <Text size="sm">Жажда: {thirst}%</Text>
        </Group>
        <Group gap={4}>
          <IconMeat size={16} color="#fd7e14" />
          <Text size="sm">Голод: {hunger}%</Text>
        </Group>
        <Group gap={4}>
          <IconCoin size={16} color="#ffd700" />
          <Text size="sm">Монеты: {coins}</Text>
        </Group>
      </Group>
    </Box>
  );
};

export default StatsIndicator;