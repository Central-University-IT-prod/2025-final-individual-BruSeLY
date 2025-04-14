import { Modal, Button } from "@mantine/core";
import { useEditProfile } from "../../hooks";
import FormFields from "./FormFields";

interface EditProfileModalProps {
  opened: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ opened, onClose }) => {
  const {
    form,
    handleNumberChange,
    handleSelectChange,
    handleSubmit,
    user,
  } = useEditProfile(opened, onClose);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Редактировать профиль"
      size="sm"
      centered
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormFields
          form={form}
          user={user}
          onNumberChange={handleNumberChange}
          onSelectChange={handleSelectChange}
        />
        <Button type="submit" fullWidth>
          Сохранить
        </Button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;