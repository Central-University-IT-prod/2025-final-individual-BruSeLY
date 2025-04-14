import { Button, Container, Group, Text, useMantineTheme } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './NotFound.module.css';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const theme = useMantineTheme();
  let navigate = useNavigate();
  
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Text className={classes.title} variant="gradient" size='24px'
            gradient={{ from: theme.colors[theme.primaryColor][6], to: theme.colors.blue[3] }}>
            404 Not Found
          </Text>
          
          <Text  ta="center" m='20px 0' className={classes.description}>
            Упс! Страница, которую вы ищете, исчезла в цифровой пустоте. 
            Возможно, это опечатка, а может быть, мы что-то передвинули. 
            Дважды проверьте URL-адрес или попробуйте нашу домашнюю страницу.
          </Text>

          <Group justify="center" mt="xl">
            <Button 
              size="md" 
              variant="outline"
              onClick={() => navigate(-1)}
              className={classes.button}
              mr="sm">
              Вернуться назад
            </Button>
            <Button 
              size="md"
              onClick={() => navigate('/')}
              variant="gradient"
              className={classes.button}
              gradient={{ from: theme.colors[theme.primaryColor][6], to: theme.colors[theme.primaryColor][4] }}>
              На начальную страницу
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;