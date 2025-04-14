import { MultiSelect } from '@mantine/core';
import { difficultyOptions } from '../../../../flow/constants';
import { DifficultyLevel } from '../../../../flow/types';
import classes from './FilterSection.module.css';

const EQUIPMENT_OPTIONS = ['Штанга', 'Гантели', 'Скакалка', 'Коврик'] as const;
const TAG_OPTIONS = ['Ноги', 'Руки', 'Корпус', 'Кардио', 'Силовая'] as const;


interface FilterSectionProps {
  selectedDifficulties: DifficultyLevel[];
  onDifficultyChange: (values: string[]) => void;
  onEquipmentChange: (values: string[]) => void;
  onTagsChange: (values: string[]) => void;
}

const FilterSection: React.FC<FilterSectionProps> = (({selectedDifficulties, onDifficultyChange, onEquipmentChange, onTagsChange}) => (
  <div className={classes.filters}>
    <MultiSelect
      radius='md'
      placeholder="Сложность"
      data={difficultyOptions}
      classNames={{ input: classes.selectInput }}
      value={selectedDifficulties}
      onChange={onDifficultyChange}
      searchable
    />
    <MultiSelect
      radius='md'
      placeholder="Оборудование"
      data={EQUIPMENT_OPTIONS}
      classNames={{ input: classes.selectInput }}
      onChange={onEquipmentChange}
    />
    <MultiSelect
      radius='md'
      placeholder="Теги"
      data={TAG_OPTIONS}
      classNames={{ input: classes.selectInput }}
      onChange={onTagsChange}
    />
  </div>
));

export default FilterSection;