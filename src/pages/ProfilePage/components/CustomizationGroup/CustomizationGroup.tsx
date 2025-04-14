import { ActionIcon, Box } from '@mantine/core';
import classes from './CustomizationGroup.module.css';
import CustomizationItem from '../CustomizationItem/CustomizationItem';
import { IconX } from '@tabler/icons-react';
import { customizationGroup, UserAvatar } from '../../../../flow/types';
import { useUserStore } from '../../../../flow/store/UserStore';

interface CustomizationGroupProps {
  group: customizationGroup;
}

const CustomizationGroup: React.FC<CustomizationGroupProps> = ({ group }) => {
  const { user, updateAvatarPart } = useUserStore();

  const avatarValue = user?.avatar[group.name.toLowerCase() as keyof UserAvatar];

  const avatarPartName = 
    avatarValue && typeof avatarValue === 'object' && !Array.isArray(avatarValue) 
      ? avatarValue.name 
      : '';

  const activeItem = group.items.find(
    (item) => avatarPartName.toLowerCase() === item.name.toLowerCase()
  );
  const isOptional = !['eyes', 'head', 'top', 'shoes'].includes(group.name.toLowerCase());
  const handleRemove = () => {
    updateAvatarPart(group.name.toLowerCase() as keyof UserAvatar, { name: '' });
  };

  return (
    <Box className={classes.customizationGroup}>
      <Box className={classes.groupItems}>
        {group.items.map((item) => (
          <CustomizationItem
            key={item.name}
            item={item}
            isActive={item.name === activeItem?.name}
            category={group.name.toLowerCase()}
            canDrop={!avatarPartName.includes(item.name)} 
          />
        ))}
        {isOptional && activeItem && (
          <Box className={classes.removeButtonContainer}>
            <ActionIcon
              className={classes.removeButton}
              onClick={handleRemove}
              radius='md'
              size='xl'
            >
              <IconX size={24} />
            </ActionIcon>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomizationGroup;

