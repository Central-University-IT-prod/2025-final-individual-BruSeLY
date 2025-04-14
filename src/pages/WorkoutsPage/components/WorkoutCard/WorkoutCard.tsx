import { Card, Text } from '@mantine/core';
import classes from './WorkoutCard.module.css';
import { Workout } from '@/flow/types';
import { useWorkoutCard } from '../../hooks';
import WorkoutCardHeader from './WorkoutCardHeader';
import WorkoutStats  from './WorkoutStats';
import ScheduleWorkoutModal from '../ScheduleWorkoutModal/ScheduleWorkoutModal';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import ExerciseList from './ExerciseList';
import ExerciseTypes from './ExerciseTypes';
import TagList from './TagList';
import CardActions from './CardAction';

interface Props {
  workout: Workout;
}

const WorkoutCard: React.FC<Props> = ({ workout }) => {
  const {
    showExercises,
    openedDeleteModal,
    openedScheduleModal,
    deleteModalHandlers,
    scheduleModalHandlers,
    handleDeleteWorkout,
    getExerciseTitle,
    navigateToWorkout,
    navigateToEdit,
    allExercises,
  } = useWorkoutCard(workout);

  return (
    <Card padding="lg" radius="lg" className={classes.card} withBorder>
      <Card.Section className={classes.header}>
        <WorkoutCardHeader title={workout.title} difficulty={workout.difficulty} />
      </Card.Section>

      <div className={classes.body}>
        <Text size="md" className={classes.description}>{workout.description}</Text>
        <WorkoutStats exerciseCount={workout.exercises.length} />
        <ExerciseTypes exercises={workout.exercises} allExercises={allExercises} />
        <TagList tags={workout.tags} />
        <ExerciseList
          show={showExercises}
          exercises={workout.exercises}
          getExerciseTitle={getExerciseTitle}
        />
      </div>

      <Card.Section className={classes.footer}>
        <CardActions
          onStart={navigateToWorkout}
          onEdit={navigateToEdit}
          onSchedule={scheduleModalHandlers.open}
          onDelete={deleteModalHandlers.open}
        />
      </Card.Section>

      <ScheduleWorkoutModal
        opened={openedScheduleModal}
        close={scheduleModalHandlers.close}
        workoutTitle={workout.title}
      />

      <ConfirmModal
        text="Вы действительно хотите удалить тренировку?"
        onSubmit={handleDeleteWorkout}
        opened={openedDeleteModal}
        onClose={deleteModalHandlers.close}
      />
    </Card>
  );
};

export default WorkoutCard;