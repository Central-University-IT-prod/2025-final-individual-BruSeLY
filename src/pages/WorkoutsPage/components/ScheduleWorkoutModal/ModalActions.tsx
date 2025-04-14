import { Group, Button } from '@mantine/core';

interface ModalActionsProps {
  onClose: () => void;
  onSchedule: () => void;
}

const ModalActions: React.FC<ModalActionsProps> = ({ onClose, onSchedule } ) => (
  <Group justify="flex-end" mt="md" w="100%">
    <Button onClick={onClose} variant="default">
      Отмена
    </Button>
    <Button onClick={onSchedule}>
      Запланировать
    </Button>
  </Group>
);

export default ModalActions;