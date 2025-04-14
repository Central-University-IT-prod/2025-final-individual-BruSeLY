import { useState } from 'react';
import { ActionIcon, ColorSwatch, Group, ScrollArea } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import classes from './ColorPicker.module.css';
import { Palette } from '../../../../flow/constants';
import { useUserStore } from '../../../../flow/store/UserStore';
import { UserAvatar, CustomizablePart } from '../../../../flow/types';


const ColorPicker = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { updateAvatarPart, currentCategory, user } = useUserStore();
  const currentPart = user?.avatar[currentCategory as keyof UserAvatar];

  const handleChangeColor = (color: string) => {
    if (currentCategory && currentPart) {
      if (typeof currentPart === 'object' && !Array.isArray(currentPart) && 'name' in currentPart) {
        updateAvatarPart(currentCategory, { name: currentPart.name, color });
      } else {
        console.error('Current part is not a valid CustomizablePart:', currentPart);
      }
    }
  };

  const isCustomizablePart = (
    part: CustomizablePart | CustomizablePart[] | string | undefined
  ): part is CustomizablePart => {
    return typeof part === 'object' && !Array.isArray(part) && 'name' in part && 'color' in part;
  };

  const currentColor = isCustomizablePart(currentPart) ? currentPart.color : undefined;

  return (
    <div className={`${classes.colorPicker} ${isOpen ? classes.open : classes.closed}`}>
      <ActionIcon
        className={classes.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        radius="xl"
        variant="filled"
      >
        {isOpen ? <IconChevronRight size={18} /> : <IconChevronLeft size={18} />}
      </ActionIcon>

      {isOpen && (
        <ScrollArea type="auto" h={300}>
          <Group gap="sm" p="sm">
            {Palette.map((color, index) => (
              <ColorSwatch
                key={index}
                color={color}
                radius="md"
                onClick={() => handleChangeColor(color)}
                style={{
                  cursor: 'pointer',
                  border: currentColor === color ? '2px solid var(--mantine-color-gray-9)' : 'none',
                  boxShadow: currentColor === color ? '0 0 8px rgba(0, 0, 0, 0.5)' : 'none',
                }}
              />
            ))}
          </Group>
        </ScrollArea>
      )}
    </div>
  );
};

export default ColorPicker;