import { useState, useEffect } from 'react';
import { Text, Button, Group, RingProgress } from '@mantine/core';
import { IconPlayerPlay, IconPlayerPause, IconRefresh } from '@tabler/icons-react';
import classes from './ExerciseTimer.module.css'

interface ExerciseTimerProps {
  target: number;
  onComplete: (timeSpent: number) => void;
  isDisabled?: boolean;
  exerciseId: string;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ target, onComplete, isDisabled, exerciseId }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); 
  useEffect(() => {
    let intervalId: number;

    if (isRunning && !isCompleted) {
      intervalId = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
    };
  }, [isRunning, isCompleted, exerciseId]); 

  useEffect(() => {
    setTime(0);
    setIsRunning(false);
    setIsCompleted(false);
  }, [exerciseId]);

  useEffect(() => {
    if (time >= target && !isCompleted) {
      setIsRunning(false);
      setIsCompleted(true); 

      onComplete(time); 
    }
  }, [time, target, isCompleted, onComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (time / target) * 100;

  return (
    <div className={classes.timerContainer}>
      <Text className={classes.timerLabel}>Время упражнения</Text>
      <div className={classes.timerActivity}>
        <RingProgress
          size={120}
          thickness={8}
          sections={[{ value: progress, color: 'blue' }]}
          label={
            <Text size="lg" fw={700}>
              {formatTime(time)}
            </Text>
          }
        />
      </div>
      <Group className={classes.actions}>
        <Button
          variant="light"
          color={isRunning ? 'red' : 'blue'}
          onClick={toggleTimer}
          radius="xl"
          disabled={isDisabled || isCompleted} 
        >
          {isRunning ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
        </Button>
        <Button
          variant="light"
          onClick={resetTimer}
          radius="xl"
          disabled={isDisabled}
        >
          <IconRefresh size={20} />
        </Button>
      </Group>
    </div>
  );
};

export default ExerciseTimer;