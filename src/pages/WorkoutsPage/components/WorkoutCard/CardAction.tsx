import { Button, Flex, ActionIcon, Menu } from '@mantine/core';
import { IconArrowNarrowRight, IconEdit, IconDots, IconCalendarEvent, IconTrash } from '@tabler/icons-react';
import classes from './WorkoutCard.module.css';

interface CardActionsProps {
  onStart: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onDelete: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({ onStart, onEdit, onSchedule, onDelete }) => (
  <div className={classes.footerAction}>
    <Button
      variant="filled"
      size="sm"
      rightSection={<IconArrowNarrowRight size={16} />}
      onClick={onStart}
    >
      Начать
    </Button>
    <Flex gap={4}>
      <ActionIcon
        variant="subtle"
        size="lg"
        className={classes.actionButton}
        onClick={onEdit}
      >
        <IconEdit size={18} />
      </ActionIcon>
      <Menu position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon variant="subtle" size="lg" className={classes.actionButton}>
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconCalendarEvent size={14} />}
            onClick={onSchedule}
          >
            Запланировать
          </Menu.Item>
          <Menu.Item
            leftSection={<IconTrash size={14} />}
            color="red"
            onClick={onDelete}
          >
            Удалить
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  </div>
);

export default CardActions;