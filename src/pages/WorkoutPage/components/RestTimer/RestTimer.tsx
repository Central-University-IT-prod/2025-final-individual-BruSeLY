import { useState, useEffect } from 'react';
import { Button, Group, Text, Progress, Card, Title } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';
import classes from './RestTime.module.css';

interface RestTimerProps {
  initialTime: number; 
  onComplete: () => void; 
  onAdjustTime: (delta: number) => void;
}

const RestTimer: React.FC<RestTimerProps> = ({ initialTime, onComplete, onAdjustTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); 
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    if (!isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [timeLeft, isPaused, onComplete]);

  const handleAddTime = () => {
    setTimeLeft((prev) => prev + 10);
    onAdjustTime(10); 
  };

  const handleSubtractTime = () => {
    if (timeLeft > 10) {
      setTimeLeft((prev) => prev - 10);
      onAdjustTime(-10);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Card className={classes.restCard} shadow="sm" padding="lg" radius="md">
      <Title order={2} className={classes.restTitle} mb="md">
        Отдых
      </Title>
      <Text className={classes.description}>
        Отдых помогает вашим мышцам восстановится и 
        чувствовать себя лучше, также способствуют быстрейшему росту мышц
      </Text>
      <Text size="xl" mb="md" >
        {formatTime(timeLeft)}
      </Text>
      <Progress value={(timeLeft / initialTime) * 100} size="lg" radius="md" mb="md" />
      <Group >
        <Button
          onClick={handleSubtractTime}
          disabled={timeLeft <= 10}
        >
          - 10 сек
        </Button>
        <Button onClick={handleAddTime}>
          + 10 сек
        </Button>
      </Group>
      <Group mt="md">
      <Button
          onClick={() => setIsPaused((prev) => !prev)}
          leftSection={isPaused ? <IconPlayerPlay size={16} /> : <IconPlayerPause size={16} />}
        >
          {isPaused ? 'Продолжить' : 'Пауза'}
        </Button>
        <Button variant="outline" onClick={onComplete}>
          Пропустить отдых
        </Button>
      </Group>
    </Card>
  );
};

export default RestTimer;