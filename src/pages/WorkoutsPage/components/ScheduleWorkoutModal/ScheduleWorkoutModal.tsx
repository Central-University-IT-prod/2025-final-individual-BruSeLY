import { Modal } from '@mantine/core';
import { useScheduleWorkout } from '../../hooks/useScheduleWorkout';
import DateTimeSelector from './DateTimeSelector';
import ModalActions  from './ModalActions';
import classes from './ScheduleWorkoutModal.module.css';

interface ScheduleWorkoutModalProps {
  opened: boolean;
  close: () => void;
  workoutTitle: string;
}

const ScheduleWorkoutModal: React.FC<ScheduleWorkoutModalProps> = ({ opened, close, workoutTitle }) => {
  const {
    selectedDate,
    setSelectedDate,
    timeValue,
    handleTimeChange,
    handleSchedule
  } = useScheduleWorkout(workoutTitle, close);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Запланировать тренировку"
      centered
      size="md"
      classNames={{
        title: classes.modalTitle,
        body: classes.modalBody
      }}
    >
      <DateTimeSelector
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        timeValue={timeValue}
        onTimeChange={handleTimeChange}
      />
      <ModalActions
        onClose={close}
        onSchedule={handleSchedule}
      />
    </Modal>
  );
};

export default ScheduleWorkoutModal;