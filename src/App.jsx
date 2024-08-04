import AdminRemoveUsersAndTrainers from "./pages/AdminRemoveUsersAndTrainers/AdminRemoveUsersAndTrainers";
import { TrainerRegistration } from "./pages/TrainerRegistration/TrainerRegistration";
import TrainerLessonHistory from "./pages/TrainerLessonHistory/TrainerLessonHistory";
import FavoriteTrainers from "./pages/FavoriteTrainers/FavoriteTrainers";
import GetStartedQuiz from "./components/GetStartedQuiz/GetStartedQuiz";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainerSettings from "./pages/TrainerSettings/TrainerSettings";
import TrainerDetails from "./pages/Trainer-detalis/TrainerDetalis";
import { BecomeTrainer } from "./pages/BecomeTrainer/BecomeTrainer";
import { initializeAuthListener } from "./redux/features/authSlice";
import TrainerReviews from "./pages/TrainerReviews/TrainerReviews";
import PendingTrainer from "./pages/PendingTrainer/PendingTrainer";
import TraineeLessons from "./pages/TraineeLessons/TraineeLessons";
import { TRAINEE, TRAINER, ADMIN } from "./utilities/constants";
import TrainerPanel from "./pages/TrainerPanel/TrainerPanel";
import UserSettings from "./pages/UserSettings/UserSettings";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { Layout } from "./components/Layout/Layout";
import Trainers from "./pages/Trainers/Trainers";
import Messages from "./pages/Messages/Messages";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { Home } from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up-trainee",
        element: <SignUp title={TRAINEE} />,
      },
      {
        path: "sign-up-trainer",
        element: <SignUp title={TRAINER} />,
      },
      {
        path: "trainers",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <Trainers /> }],
      },
      {
        path: "favorites",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <FavoriteTrainers /> }],
      },
      {
        path: "settings",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <UserSettings /> }],
      },
      {
        path: "trainee-lessons/:traineeId",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <TraineeLessons /> }],
      },
      {
        path: "messages/:currentUserId",
        element: <PrivateRoute allowedRoles={[TRAINEE, TRAINER]} />,
        children: [{ path: "", element: <Messages /> }],
      },
      {
        path: "trainers/:id",
        element: <TrainerDetails />,
      },
      {
        path: "become-trainer",
        element: <BecomeTrainer />,
      },
      {
        path: "trainer-registration",
        element: <TrainerRegistration />,
      },
      {
        path: "trainer-panel/:trainerId",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerPanel /> }],
      },
      {
        path: "trainer-lesson-history/:trainerId",
        element: <TrainerLessonHistory />,
      },
      {
        path: "trainer-settings",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerSettings /> }],
      },
      {
        path: "admin-settings",
        element: <PrivateRoute allowedRoles={[ADMIN]} />,
        children: [{ path: "", element: <AdminRemoveUsersAndTrainers /> }],
      },
      {
        path: "trainer-reviews/:trainerId",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerReviews /> }],
      },
      {
        path: "admin",
        element: <PrivateRoute allowedRoles={[ADMIN]} />,
        children: [{ path: "", element: <Admin /> }],
      },
    ],
  },
  {
    path: "get-started",
    element: <GetStartedQuiz />,
  },
  {
    path: "pending-trainer",
    element: <PendingTrainer />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
