import { Button, Flex } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import classes from './ExerciseCard.module.css';

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  className: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete, className }) => (
  <Flex gap={6} className={className}>
    <Button
      variant="subtle"
      p={4}
      className={classes.actionButton}
      onClick={onEdit}
    >
      <IconEdit size={20} stroke={2} />
    </Button>
    <Button
      variant="subtle"
      color="red"
      p={4}
      className={classes.actionButton}
      onClick={onDelete}
    >
      <IconTrash size={20} stroke={2} />
    </Button>
  </Flex>
);