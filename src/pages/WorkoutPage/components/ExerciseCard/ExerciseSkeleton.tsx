import { Box, Card, Flex,Skeleton } from '@mantine/core';
import classes from '../../WorkoutPage.module.css';

const ExerciseSkeleton = () => {
  return (
    <div className="wrapper">
      <Box className={classes.wrapper}>
        <Card className={classes.exerciseCard} shadow="sm" padding="lg" radius="md">
          <Skeleton height={30} width="60%" mb="md" />
          <Skeleton height={10} mb="md" />
          <Skeleton height={20} width="80%" mb="sm" />
          <Skeleton height={16} width="100%" mb="md" />
          <Skeleton height={40} width="100%" mb="md" />
          <Skeleton height={40} width="100%" mb="md" />
          <Flex justify="space-between" mt="md" gap="sm">
            <Skeleton height={40} width="30%" />
            <Skeleton height={40} width="30%" />
            <Skeleton height={40} width="30%" />
          </Flex>
        </Card>
      </Box>
    </div>
  )
}

export default ExerciseSkeleton