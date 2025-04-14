import { useUserStore } from "@/flow/store/UserStore";
import { useWorkoutStore } from "@/flow/store/WorkoutStore";
import { DifficultyLevel } from "@/flow/types";
import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { useExerciseStore } from "../ExcercisesPage/hooks";
import RestTimer from "./components/RestTimer/RestTimer";
import WorkoutStatsModal from "./components/WorkoutStatsModal/WorkoutStatsModal";
import classes from './WorkoutPage.module.css';
import ExerciseSkeleton from "./components/ExerciseCard/ExerciseSkeleton";
import { ExerciseCard } from "./components/ExerciseCard/ExerciseCard";

const WorkoutPage: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const location = useLocation();
  const { getWorkoutById } = useWorkoutStore();
  const { getExerciseById } = useExerciseStore();
  const { completeWorkout } = useUserStore();
  
  const workout = workoutId === 'temporary'
    ? location.state?.workout
    : getWorkoutById(workoutId || '');
  const [isRewardGiven, setIsRewardGiven] = useState<boolean>(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(30);
  const [workoutStartTime, setWorkoutStartTime] = useState<number>(Date.now());
  const [totalReps, setTotalReps] = useState<number>(0);
  const [exerciseCompleted, setExerciseCompleted] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState<boolean>(false);

  const [stats, setStats] = useState<{
    experienceGained: number;
    coinsGained: number;
    exerciseStats: Array<{ title: string; repetitions: number; timeSpent: number }>;
  }>({
    experienceGained: 0,
    coinsGained: 0,
    exerciseStats: [],
  });

  useEffect(() => {
    setWorkoutStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!workout && !isLoading) {
      showNotification({
        message: 'Тренировка не найдена',
        color: 'red',
      });
    }
  }, [workout, isLoading]);

  useEffect(() => {
    if (workout) {
      const currentWorkoutExercise = workout.exercises[currentExerciseIndex];
      const currentExercise = getExerciseById(currentWorkoutExercise.id);
      if (!currentExercise && !isLoading) {
        showNotification({
          message: 'Упражнение не найдено',
          color: 'red',
        });
      }
    }
  }, [workout, currentExerciseIndex, getExerciseById, isLoading]);

  const handleNextExercise = (shouldRest: boolean = true) => {
    if (workout && currentExerciseIndex < workout.exercises.length - 1) {
      if (shouldRest && !isWorkoutCompleted) {
        setIsResting(true);
      } else {
        setCurrentExerciseIndex((prev) => prev + 1);
        setExerciseCompleted(false);
      }
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    setCurrentExerciseIndex((prev) => prev + 1);
    setExerciseCompleted(false);
  };

  const handleSkipExercise = () => {
    handleNextExercise(false);
  };

  const handleExerciseComplete = (repsCompleted: number, timeSpent: number = 0, type?: string) => {
    if (workout) {
      const currentWorkoutExercise = workout.exercises[currentExerciseIndex];
      const currentExercise = getExerciseById(currentWorkoutExercise.id);
      if (currentExercise) {
        setStats((prevStats) => ({
          ...prevStats,
          exerciseStats: [
            ...prevStats.exerciseStats,
            {
              title: currentExercise.title,
              repetitions: repsCompleted,
              timeSpent: timeSpent || currentWorkoutExercise.target,
            },
          ],
        }));

        setTotalReps((prevTotal) => prevTotal + repsCompleted);
        setExerciseCompleted(true);

        if (currentExerciseIndex === workout.exercises.length - 1 && type !== 'time') {
          showWorkoutStats();
        } else {
          handleNextExercise();
        }
      }
    }
  };

  const showWorkoutStats = () => {
    if (workout && !isWorkoutCompleted && !isRewardGiven) {
      setIsModalOpen(true);
      setIsWorkoutCompleted(true);
      setIsRewardGiven(true);
  
      const isTemporary = workoutId === 'temporary';
  
      const validDifficulties: DifficultyLevel[] = ['beginner', 'intermediate', 'advanced'];
      const difficulty: DifficultyLevel = validDifficulties.includes(workout.difficulty as DifficultyLevel)
        ? (workout.difficulty as DifficultyLevel)
        : 'beginner';
  
      const coinsGained = isTemporary ? 10 : { beginner: 10, intermediate: 20, advanced: 50 }[difficulty];
      const experienceGained = isTemporary ? 0 : { beginner: 50, intermediate: 100, advanced: 200 }[difficulty];
  
      completeWorkout(difficulty, workout, coinsGained);
  
      setStats((prevStats) => ({
        ...prevStats,
        experienceGained,
        coinsGained,
      }));
    }
  };

  const progress = workout ? ((currentExerciseIndex + 1) / workout.exercises.length) * 100 : 0;

  if (isLoading) { 
    <ExerciseSkeleton />
  }

  if (!workout) {
    return null;
  }

  const currentWorkoutExercise = workout.exercises[currentExerciseIndex];
  const currentExercise = getExerciseById(currentWorkoutExercise.id);
  if (!currentExercise) {
    return null;
  }

  const isLastExercise: boolean = currentExerciseIndex === workout.exercises.length - 1;

  return (
    <div className="wrapper">
      <Box className={classes.wrapper}>
        {isResting ? (
          <RestTimer
            initialTime={restTime}
            onComplete={handleRestComplete}
            onAdjustTime={(delta: number) => setRestTime((prev) => prev + delta)}
          />
        ) : (
          <ExerciseCard
            workoutTitle={workout.title}
            progress={progress}
            currentExercise={currentExercise}
            currentWorkoutExercise={currentWorkoutExercise}
            exerciseCompleted={exerciseCompleted}
            isWorkoutCompleted={isWorkoutCompleted}
            showInstructions={showInstructions}
            setShowInstructions={setShowInstructions}
            onExerciseComplete={handleExerciseComplete}
            currentExerciseIndex={currentExerciseIndex}
            isLastExercise={isLastExercise}
            handleSkipExercise={handleSkipExercise}
            showWorkoutStats={showWorkoutStats}
            stats={stats}
            workout={workout}
            setCurrentExerciseIndex={setCurrentExerciseIndex}
          />
        )}
      </Box>

      <WorkoutStatsModal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        workoutDuration={(Date.now() - workoutStartTime) / 1000}
        totalReps={totalReps}
        experienceGained={stats.experienceGained}
        coinsGained={stats.coinsGained}
        exerciseStats={stats.exerciseStats}
      />
    </div>
  );
};

export default WorkoutPage;