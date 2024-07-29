import TrainerSessionHistory from "./pages/TrainerSessionHistory/TrainerSessionHistory";
import { TrainerRegistration } from "./pages/TrainerRegistration/TrainerRegistration";
import FavoriteTrainers from "./pages/FavoriteTrainers/FavoriteTrainers";
import GetStartedQuiz from "./components/GetStartedQuiz/GetStartedQuiz";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainerMessages from "./pages/TrainerMessages/TrainerMessages";
import TrainerSettings from "./pages/TrainerSettings/TrainerSettings";
import TrainerDetails from "./pages/Trainer-detalis/TrainerDetalis";
import { BecomeTrainer } from "./pages/BecomeTrainer/BecomeTrainer";
import { initializeAuthListener } from "./redux/features/authSlice";
import TrainerReviews from "./pages/TrainerReviews/TrainerReviews";
import TrainerPanel from "./pages/TrainerPanel/TrainerPanel";
import UserSettings from "./pages/UserSettings/UserSettings";
import { Layout } from "./components/Layout/Layout";
import Trainers from "./pages/Trainers/Trainers";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { Home } from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import { useEffect } from "react";
import AdminRemoveUsersAndTrainers from "./pages/AdminRemoveUsersAndTrainers/AdminRemoveUsersAndTrainers";
import PendingTrainer from "./pages/PendingTrainer/PendingTrainer";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import { TRAINEE, TRAINER, ADMIN } from "./utilities/constants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up-trainee",
        element: <SignUp title={"trainee"} />,
      },
      {
        path: "sign-up-trainer",
        element: <SignUp title={"trainer"} />,
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
        path: "trainers/:id",
        element: <TrainerDetails />,
      },
      {
        path: "become-trainer",
        element: <BecomeTrainer />,
      },
      {
        path: "trainer-registration",
        element: <PrivateRoute allowedRoles={[TRAINEE]} />,
        children: [{ path: "", element: <TrainerRegistration /> }],
      },
      {
        path: "trainer-panel/:trainerId",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerPanel /> }],
      },
      {
        path: "trainer-session-history",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerSessionHistory /> }],
      },
      {
        path: "trainer-messages",
        element: <PrivateRoute allowedRoles={[TRAINER]} />,
        children: [{ path: "", element: <TrainerMessages /> }],
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
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuthListener());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
