import { Modal, Button } from '@mantine/core';
import { Exercise } from '@/flow/types';
import { useExerciseForm } from '../../hooks';
import { BasicInfoFields, CategoryFields, MeasurementFields } from './Fields';
import { ImageUpload } from './ImageUpload.tsx/ImageUpload';
import classes from './Modal.module.css';
import { InstructionsField } from './Fields/InstrucationField';

interface AddExerciseModalProps {
  opened: boolean;
  onClose: () => void;
  exercise?: Exercise;
}

const AddExerciseModal: React.FC<AddExerciseModalProps> = ({ opened, onClose, exercise }) => {
  const { form, handleFormSubmit, selectedType } = useExerciseForm(exercise, onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={exercise ? 'Редактировать упражнение' : 'Добавить новое упражнение'}
      size="xl"
      centered
    >
      <form onSubmit={handleFormSubmit} className={classes.form}>
        <BasicInfoFields form={form} selectedType={selectedType} />
        <MeasurementFields form={form} />
        <CategoryFields form={form} />
        <InstructionsField form={form}/>
        <ImageUpload form={form} />
        
        <div className={classes.actionButtons}>
          <Button variant="outline" onClick={onClose} size="md">
            Отмена
          </Button>
          <Button type="submit" size="md">
            {exercise ? 'Сохранить изменения' : 'Добавить упражнение'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExerciseModal;
