import {
  Burger,
  Container,
  Flex,
  Title,
  rem,
  Drawer,
  Box,
  ScrollArea,
  Menu,
  Button,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { NavLink } from "react-router";
import { IconBikeFilled, IconSettings } from "@tabler/icons-react";
import { useUserStore } from "@/flow/store/UserStore"; 
import classes from './Header.module.css'
import { User } from "@/flow/types";
import { showNotification } from "@mantine/notifications";

const links = [
  { link: "/workouts", label: "Тренировки" },
  { link: "/workouts/addWorkout", label: "Конструктор Тренировок" },
  { link: "/exercises", label: "Упражнения" },
  { link: "/profile", label: "Профиль" },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 120 });
  const { user, updateUser } = useUserStore();

  const handleTestAction = (action: string) => {
    if (!user) return;
  
    const currentUser = user as User;
    const updatedUser = { ...currentUser };
  
    switch (action) {
      case 'addCoins':
        updatedUser.proteinsCoins += 500;
        showNotification({
          title: 'Добавлено 500 монет',
          message: `Текущий баланс: ${updatedUser.proteinsCoins}`,
          color: 'green'
        });
        break;
  
      case 'increaseIntensity':
        updatedUser.workoutIntensity = Math.min(
          (updatedUser.workoutIntensity || 0) + 10, 
          100
        );
        updatedUser.workoutHistory = [
          ...(updatedUser.workoutHistory || []),
          { date: new Date(), intensity: updatedUser.workoutIntensity }
        ];
        showNotification({
          title: 'Интенсивность увеличена',
          message: `Текущая интенсивность: ${updatedUser.workoutIntensity}%`,
          color: 'blue'
        });
        break;
  
      case 'decreaseIntensity':
        updatedUser.workoutIntensity = Math.max(
          (updatedUser.workoutIntensity || 0) - 10, 
          0
        );
        updatedUser.workoutHistory = [
          ...(updatedUser.workoutHistory || []),
          { date: new Date(), intensity: updatedUser.workoutIntensity }
        ];
        showNotification({
          title: 'Интенсивность уменьшена',
          message: `Текущая интенсивность: ${updatedUser.workoutIntensity}%`,
          color: 'yellow'
        });
        break;
  
      case 'decreaseHunger':
        updatedUser.hunger = Math.max(updatedUser.hunger - 30, 0);
        showNotification({
          title: 'Голод уменьшен',
          message: `Текущий голод: ${updatedUser.hunger}%`,
          color: 'green'
        });
        break;
  
      case 'decreaseThirst':
        updatedUser.thirst = Math.max(updatedUser.thirst - 30, 0);
        showNotification({
          title: 'Жажда уменьшена',
          message: `Текущая жажда: ${updatedUser.thirst}%`,
          color: 'green'
        });
        break;

        case 'setIntensity1':
          updatedUser.workoutIntensity = 1;
          updatedUser.workoutHistory = [
            ...(updatedUser.workoutHistory || []),
            { date: new Date(), intensity: 1 }
          ];
          showNotification({
            title: 'Интенсивность изменена',
            message: `Установлен легкий уровень тренировки`,
            color: 'blue'
          });
          break;
    
        case 'setIntensity2':
          updatedUser.workoutIntensity = 2;
          updatedUser.workoutHistory = [
            ...(updatedUser.workoutHistory || []),
            { date: new Date(), intensity: 2 }
          ];
          showNotification({
            title: 'Интенсивность изменена',
            message: `Установлен средний уровень тренировки`,
            color: 'blue'
          });
          break;
    
        case 'setIntensity3':
          updatedUser.workoutIntensity = 3;
          updatedUser.workoutHistory = [
            ...(updatedUser.workoutHistory || []),
            { date: new Date(), intensity: 3 }
          ];
          showNotification({
            title: 'Интенсивность изменена',
            message: `Установлен продвинутый уровень тренировки`,
            color: 'blue'
          });
          break;
    
        case 'setIntensity4':
          updatedUser.workoutIntensity = 4;
          updatedUser.workoutHistory = [
            ...(updatedUser.workoutHistory || []),
            { date: new Date(), intensity: 4 }
          ];
          showNotification({
            title: 'Интенсивность изменена',
            message: `Установлен экспертный уровень тренировки`,
            color: 'blue'
          });
          break;
  
      case 'addExperience':
        updatedUser.experience += 100;
        if (updatedUser.experience >= updatedUser.level * 100) {
          updatedUser.level += 1;
          updatedUser.experience = 0;
          showNotification({
            title: 'Уровень повышен!',
            message: `Новый уровень: ${updatedUser.level}`,
            color: 'grape'
          });
        } else {
          showNotification({
            title: 'Опыт добавлен',
            message: `До следующего уровня: ${(updatedUser.level * 100) - updatedUser.experience} XP`,
            color: 'blue'
          });
        }
        break;
  
      case 'completeWorkout':
        updatedUser.completedWorkouts += 1;
        updatedUser.lastWorkoutDate = new Date();
        updatedUser.workoutHistory = [
          ...(updatedUser.workoutHistory || []),
          { date: new Date(), intensity: updatedUser.workoutIntensity || 50 }
        ];
        showNotification({
          title: 'Тренировка завершена',
          message: `Всего тренировок: ${updatedUser.completedWorkouts}`,
          color: 'green'
        });
        break;
  
      default:
        return;
    }
  
    updateUser(updatedUser, true);
  };

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={classes.link}
      onClick={closeDrawer}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Box className={classes.root}>
      <header
        className={classes.header}
        style={{ transform: `translate3d(0, ${pinned ? 0 : '-110%'}, 0)` }}
      >
        <Container className={classes.inner} size="xl">
          <NavLink to="/" key="logo" className={classes.logoContainer}>
            <IconBikeFilled size={32} className={classes.logoIcon} />
            <span className={classes.logo}>TrainingHub</span>
          </NavLink>

          <Flex gap="xl" visibleFrom="md" className={classes.links}>
            {items}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" leftSection={<IconSettings size={20} />}>
                  Тест
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Тестовые действия</Menu.Label>
                <Menu.Item onClick={() => handleTestAction('addCoins')}>
                  +500 монет
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('decreaseHunger')}>
                  -30 к голоду
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('decreaseThirst')}>
                  -30 к жажде
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('addExperience')}>
                  +100 опыта
                </Menu.Item>
                <Menu.Label>Уровни интенсивности</Menu.Label>
                <Menu.Item onClick={() => handleTestAction('setIntensity1')}>
                  Легкий уровень (1)
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('setIntensity2')}>
                  Средний уровень (2)
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('setIntensity3')}>
                  Продвинутый уровень (3)
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('setIntensity4')}>
                  Экспертный уровень (4)
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="md"
            size="sm"
            className={classes.burger}
          />
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        hiddenFrom="md"
        zIndex={1000}
        classNames={{
          body: classes.drawerBody,
          content: classes.drawerContent,
        }}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Title order={2} className={classes.logo} mb="md" pl="24px">
            TrainingHub
          </Title>
          <Flex direction="column" gap="md" px="md">
            {items}
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="subtle" leftSection={<IconSettings size={20} />}>
                  Тест
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Тестовые действия</Menu.Label>
                <Menu.Item onClick={() => handleTestAction('addCoins')}>
                  +500 монет
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('decreaseHunger')}>
                  -30 к голоду
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('decreaseThirst')}>
                  -30 к жажде
                </Menu.Item>
                <Menu.Item onClick={() => handleTestAction('addExperience')}>
                  +100 опыта
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}