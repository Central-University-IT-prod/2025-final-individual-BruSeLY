import { Flex } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';

interface DateTimeSelectorProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  timeValue: string;
  onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({selectedDate, onDateChange, timeValue, onTimeChange }) => (
  <Flex direction="column" align="center" gap="md">
    <DatePicker
      value={selectedDate}
      onChange={onDateChange}
      size='md'
      locale='ru'
      minDate={new Date()}
    />
    <TimeInput
      label="Выберите время"
      placeholder="Выберите время"
      value={timeValue}
      onChange={onTimeChange}
      leftSection={<IconClock size={16} />}
      required
    />
  </Flex>
);

export default DateTimeSelector;