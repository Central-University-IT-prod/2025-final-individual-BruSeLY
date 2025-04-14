import { Badge, Group } from '@mantine/core';
import { IconBarbell, IconJumpRope, IconYoga } from '@tabler/icons-react';

interface EquipmentBadgesProps {
  equipment: string[];
  className: string;
}

const equipmentIcons: Record<string, JSX.Element> = {
  'Штанга': <IconBarbell size={16} />,
  'Скакалка': <IconJumpRope size={16} />,
  'Коврик': <IconYoga size={16} />,
  'default': <IconBarbell size={16} />
};

const EquipmentBadges: React.FC<EquipmentBadgesProps> = ({ equipment, className }) => (
  <Group gap={4} className={className}>
    {equipment.length > 0 ? (
      equipment.map(eq => (
        <Badge
          key={eq}
          variant="light"
          leftSection={equipmentIcons[eq] || equipmentIcons.default}
          radius="sm"
        >
          {eq}
        </Badge>
      ))
    ) : (
      <Badge variant="light" radius="sm">
        Без оборудования
      </Badge>
    )}
  </Group>
);

export default EquipmentBadges;