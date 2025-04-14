import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useUserStore } from '@flow/store/UserStore';
import { useExerciseStore } from '@flow/store/ExercisesStore';
import { useWorkoutStore } from '@flow/store/WorkoutStore';
import { Header } from '@components/Header/Header';
import AddWorkoutPage from '@pages/CreateWorkoutPage/CreateWorkoutPage';
import ExercisesPage from '@pages/ExcercisesPage/ExercisesPage';
import NotFound from '@pages/NotFoundPage/NotFound';
import StartPage from '@pages/StartPage/StartPage';
import WorkoutsPage from '@pages/WorkoutsPage/WorkoutsPage';
import WorkoutPage from '@pages/WorkoutPage/WorkoutPage';
import CreateProfilePage from '@pages/CreateProfilePage/CreateProfilePage';
import ProfilePage from '@pages/ProfilePage/ProfilePage';
import { decreaseStatsOverTime } from '@flow/utils';

function App() {
  const { loadExercises, initializeDB: initializeExerciseDb } = useExerciseStore();
  const { loadWorkouts, initializeDB: initializeWorkoutsDb } = useWorkoutStore();
  const { loadUser, getUser, updateUser } = useUserStore();

  useEffect(() => {
    initializeExerciseDb();
    initializeWorkoutsDb();
  }, [initializeExerciseDb, initializeWorkoutsDb]);

  useEffect(() => {
    const loadData = async () => {
      await loadExercises();
      await loadWorkouts();
      await loadUser();
    };

    loadData();
  }, [loadExercises, loadWorkouts, loadUser]);


  useEffect(() => {
    const interval = setInterval(() => {
      const user = getUser();
      if (user) {
        const updatedUser = decreaseStatsOverTime(user);
        updateUser(updatedUser);
      }
    }, 60000); 

    return () => clearInterval(interval); 
  }, [getUser, updateUser]);

  const user = getUser();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<StartPage />}
          />
          <Route
            path="/profile/create"
            element={user ? <Navigate to="/profile" /> : <CreateProfilePage />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/profile/create" />}
          />
          <Route
            path="/workouts"
            element={user ? <WorkoutsPage /> : <Navigate to="/profile/create" />}
          />
          <Route
            path="/workouts/:workoutId"
            element={user ? <WorkoutPage /> : <Navigate to="/profile/create" />}
          />
          <Route
            path="/workouts/addWorkout"
            element={user ? <AddWorkoutPage /> : <Navigate to="/profile/create" />}
          />
          <Route
            path="/workouts/editWorkout/:workoutId"
            element={user ? <AddWorkoutPage /> : <Navigate to="/profile/create" />}
          />
          <Route
            path="/exercises"
            element={user ? <ExercisesPage /> : <Navigate to="/profile/create" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;