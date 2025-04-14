import { useState, useCallback } from 'react';
import { showNotification } from '@mantine/notifications';

export const useScheduleWorkout = (workoutTitle: string, onClose: () => void) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const timeValue = selectedTime ? selectedTime.toTimeString().slice(0, 5) : '';

  const handleTimeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = event.target.value;
    const [hours, minutes] = timeString.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setSelectedTime(newTime);
  }, []);

  const createGoogleCalendarLink = useCallback(() => {
    if (!selectedDate || !selectedTime) return;

    const startDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const startDateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endDateString = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    const title = encodeURIComponent(workoutTitle);
    const details = encodeURIComponent('Тренировка запланирована через наше приложение.');

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDateString}/${endDateString}`;
  }, [selectedDate, selectedTime, workoutTitle]);

  const handleSchedule = useCallback(() => {
    if (selectedDate && selectedTime) {
      const link = createGoogleCalendarLink();
      if (link) {
        window.open(link, '_blank');
      }
      onClose();
    } else {
      showNotification({
        title: 'Ошибка',
        message: 'Заполните время',
        color: 'red'
      });
    }
  }, [selectedDate, selectedTime, createGoogleCalendarLink, onClose]);

  return {
    selectedDate,
    setSelectedDate,
    timeValue,
    handleTimeChange,
    handleSchedule
  };
};
