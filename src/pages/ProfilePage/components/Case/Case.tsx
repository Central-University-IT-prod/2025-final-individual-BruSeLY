import { ActionIcon, Box } from '@mantine/core';
import { IconGift } from '@tabler/icons-react';
import classes from './Case.module.css';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import ConfirmModal from '../../../../components/ConfirmModal/ConfirmModal';
import { useUserStore } from '../../../../flow/store/UserStore';


const translateCategory = (category: string): string => {
  const translations: Record<string, string> = {
    bodyType: 'Тип тела',
    head: 'головой',
    hair: 'волосами',
    nose: 'носом',
    eyes: 'глаззом',
    eyebrow: 'бровями',
    top: 'одеждой',
    bottom: 'низом',
    shoes: 'обувью',
    face: 'лицом',
    facialhair: 'бородой',
    glasses: 'очками',
    hat: 'шляпой',
    accessories: 'аксессуаром',
  };

  return translations[category] || category; 
};

const Case = () => {
  const { user, currentCategory, openCase, isCaseOpened } = useUserStore(); 
  const coins = user?.proteinsCoins || 0;
  const caseCost = 100;
  const [opened, { open, close }] = useDisclosure();

  const handleOpenCase = () => {
    if (isCaseOpened) { 
      showNotification({
        message: 'Вы уже открываете кейс. Подождите завершения.',
        color: 'yellow',
      });
      return;
    }

    if (currentCategory === 'top') {
      showNotification({
        message: 'Тело можно улучшить только тренировками, но вы можете поменять цвет одежды',
        color: 'yellow',
      });
      return;
    }

    if (coins < caseCost) {
      showNotification({
        message: `У вас не хватает ${caseCost - coins} монет`,
        color: 'red',
        title: 'Накопите больше монет',
      });
      return;
    }

    openCase(currentCategory, caseCost);
  };

  return (
    <>
      <Box className={classes.caseContainer}>
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="violet"
          onClick={open}
        >
          <IconGift size={24} />
        </ActionIcon>
      </Box>
      <ConfirmModal
        opened={opened}
        onClose={close}
        text={`Вы точно хотите открыть ящик с ${translateCategory(currentCategory)} за 100 монет?`}
        onSubmit={handleOpenCase}
      />
    </>
  );
};

export default Case;