import { Modal, Button, Group, Text } from "@mantine/core";

interface Props {
  text: string;
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmModal: React.FC<Props> = ({ text, opened, onClose, onSubmit }) => {
  const handleConfirm = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Подтверждение действия"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text mb="xl">{text}</Text>

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose}>
          Отмена
        </Button>
        <Button color="red" onClick={handleConfirm}>
          Подтвердить
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmModal;