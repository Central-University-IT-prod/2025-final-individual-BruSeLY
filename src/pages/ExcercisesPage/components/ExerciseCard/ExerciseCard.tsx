import { Card, Flex } from '@mantine/core';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { Exercise } from '@/flow/types';
import AddExerciseModal from '../Modals/AddExerciseModal';
import classes from './ExerciseCard.module.css';
import { useExerciseCard } from '../../hooks/useExerciseCard';
import { ExerciseImage } from './ExerciseImage';
import { ExerciseBadges } from './ExerciseBadge';
import EquipmentBadges from './EquipmentBadges';
import { ActionButtons } from './ActionButton';

interface Props {
  id: string;
  exercise: Exercise;
  activity?: boolean;
}

const ExerciseCard: React.FC<Props> = ({ exercise, activity }) => {
  const {
    opened,
    openedEditModal,
    showInstructions,
    isAnimating,
    open,
    close,
    openEditModal,
    closeEditModal,
    handleDelete,
    handleCardClick,
  } = useExerciseCard(exercise);

  return (
    <Card
      padding="lg"
      radius="xl"
      className={classes.card}
      onClick={handleCardClick}
    >
      <Card.Section className={classes.imageSection}>
        {exercise.image && <ExerciseImage image={exercise.image} className={classes.image} />}
      </Card.Section>

      <div className={classes.content}>
        <h2 className={classes.title}>{exercise.title}</h2>
        <ExerciseBadges
          difficulty={exercise.difficulty}
          tags={exercise.tags}
          className={classes.additional}
        />
        <p className={classes.description}>{exercise.description}</p>

        <Flex justify="space-between">
          <EquipmentBadges equipment={exercise.equipment} className={classes.equipment} />
          {activity && (
            <ActionButtons
              onEdit={openEditModal}
              onDelete={open}
              className={classes.actions}
            />
          )}
        </Flex>
      </div>

      {showInstructions && (
        <div className={`${classes.instructionsContainer} ${
          isAnimating ? classes.instructionsContainerExiting : classes.instructionsContainerEntering
        }`}>
          <div className={classes.instructions}>
            <p>Инструкции</p>
            <p className={classes.instructionsText}>{exercise.instructions}</p>
          </div>
        </div>
      )}


      <ConfirmModal
        text={`Вы точно хотите удалить упражнение ${exercise.title}?`}
        onSubmit={handleDelete}
        opened={opened}
        onClose={close}
      />
      <AddExerciseModal
        opened={openedEditModal}
        onClose={closeEditModal}
        exercise={exercise}
      />
    </Card>
  );
};

export default ExerciseCard;

