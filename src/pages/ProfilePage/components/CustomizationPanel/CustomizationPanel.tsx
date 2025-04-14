import { SegmentedControl, ScrollArea } from '@mantine/core';
import { useState } from 'react';
import classes from './CustomizationPanel.module.css';
import { getCustomizationGroups } from '../../../../flow/utils';
import CustomizationGroup from '../CustomizationGroup/CustomizationGroup';
import { translateLabel } from '../../../../flow/utils';
import { useUserStore } from '../../../../flow/store/UserStore';
import { UserAvatar } from '../../../../flow/types';
import { showNotification } from '@mantine/notifications';

const CustomizationPanel = () => {
  const userGender = useUserStore((state) => state.user)?.gender || 'male';
  const { isCaseOpened } = useUserStore();
  const customizationGroups = getCustomizationGroups(userGender);
  const [selectedGroup, setSelectedGroup] = useState(customizationGroups[0].name);
  const setCategory = useUserStore((state) => state.setCategory);

  const handleGroupChange = (groupName: string) => {
    if (isCaseOpened) {
      showNotification({
        message: 'Дождитесь окончания открытия кейса',
        color: 'yellow'
      })
      return;
    }
    setSelectedGroup(groupName);

    const categoryKey = groupName.toLowerCase() as keyof UserAvatar;
    setCategory(categoryKey);
  };

  return (
    <div className={classes.customizationPanel}>
      <ScrollArea type="scroll" scrollbarSize={8} offsetScrollbars>
        <SegmentedControl
          value={selectedGroup}
          onChange={handleGroupChange}
          data={customizationGroups.map((group) => ({
            value: group.name,
            label: translateLabel(group.name),
          }))}
          color="violet"
          fullWidth
          variant="outline"
          className={classes.segmentedControl}
        />
      </ScrollArea>

      <div className={classes.groupContent}>
        {customizationGroups.map(
          (group) =>
            group.name === selectedGroup && (
              <CustomizationGroup key={group.name} group={group} />
            )
        )}
      </div>
    </div>
  );
};

export default CustomizationPanel;