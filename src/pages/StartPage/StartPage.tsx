import { Text, Button, Group } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import styles from './StartPage.module.css';
import { useNavigate } from 'react-router';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <div className={styles.wrapper}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h2 className={styles.title}>
            Добро пожаловать в 
            <span className={styles.highlight}> Наше Приложение</span>
          </h2>
          
          <Text className={styles.description} size='xl' mt="xl">
            Тренируйтесь, занимайтесь своим здоровьем каждый день вместе с нами!
            Но для начала заполните поля про себя для составления персонализированных тренировок.
          </Text>

          <Group mt={40}>
            <Button
              size="lg"
              radius='md'
              className={styles.primaryButton}
              onClick={() => navigate('/profile/create')}
              rightSection={<IconArrowRight size={20} className={styles.buttonIcon} />}
            >
              Начать тренировки
            </Button>
          </Group>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StartPage;