import { Button, MultiSelect, Tooltip, ActionIcon, NumberInput } from '@mantine/core';
import { IconArrowsShuffle } from '@tabler/icons-react';
import classes from '../../CreateWorkoutPage.module.css';


interface HeaderActionsProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedEquipment: string[];
  setSelectedEquipment: (equipment: string[]) => void;
  maxAutoExercises: number;
  setMaxAutoExercises: (value: number) => void;
  handleAutoSelectExercises: () => void;
  openModal: () => void;
  openSaveModal: () => void;
  selectedExercises: any[];
  allTags: string[];
  allEquipment: string[];
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  selectedTags,
  setSelectedTags,
  selectedEquipment,
  setSelectedEquipment,
  maxAutoExercises,
  setMaxAutoExercises,
  handleAutoSelectExercises,
  openModal,
  openSaveModal,
  selectedExercises,
  allTags,
  allEquipment,
}) => {
  return (
    <div className="header">
      <div className={classes.actions}>
        <div className={classes.autoSelectionContainer}>
          <div className={classes.filters}>
            <MultiSelect
              data={allTags}
              value={selectedTags}
              onChange={setSelectedTags}
              placeholder="Теги"
              className={classes.filterSelect}
              radius="md"
              maxDropdownHeight={200}
            />
            <MultiSelect
              data={allEquipment}
              value={selectedEquipment}
              onChange={setSelectedEquipment}
              placeholder="Снаряжение"
              className={classes.filterSelect}
              radius="md"
              maxDropdownHeight={200}
            />
          </div>
          <div className={classes.autoControls}>
            <NumberInput
              value={maxAutoExercises}
              onChange={(val) => setMaxAutoExercises(Number(val))}
              min={1}
              max={20}
              placeholder="Кол-во"
              className={classes.numberInput}
              size="sm"
              w={80}
            />
            <Tooltip label="Автоподбор упражнений">
              <ActionIcon size={36} onClick={handleAutoSelectExercises} variant="light">
                <IconArrowsShuffle size={18} />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
        <div className={classes.actionsRight}>
          <Button onClick={openModal} size="sm" variant="light">
            Добавить упражнение
          </Button>
          <Tooltip
            label={
              selectedExercises.length
                ? 'Сохраните план тренировки'
                : 'Выберите хотя бы одно упражнение'
            }
          >
            <Button onClick={openSaveModal} disabled={selectedExercises.length === 0}>
              Сохранить тренировку
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};