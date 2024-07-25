import { TrainerRegistration } from "./pages/TrainerRegistration/TrainerRegistration";
import FavoriteTrainers from "./pages/FavoriteTrainers/FavoriteTrainers";
import GetStartedQuiz from "./components/GetStartedQuiz/GetStartedQuiz";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainerDetails from "./pages/Trainer-detalis/TrainerDetalis";
import { BecomeTrainer } from "./pages/BecomeTrainer/BecomeTrainer";
import { initializeAuthListener } from "./redux/features/authSlice";
import TrainerPanel from "./components/TrainerPanel/TrainerPanel";
import UserSettings from "./pages/UserSettings/UserSettings";
import { Layout } from "./components/Layout/Layout";
import Trainers from "./pages/Trainers/Trainers";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import { useDispatch } from "react-redux";
import { Home } from "./pages/Home/Home";
import { useEffect } from "react";

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
        element: <Trainers />,
      },
      {
        path: "favorites",
        element: <FavoriteTrainers />,
      },
      {
        path: "settings",
        element: <UserSettings />,
      },
      {
        path: "get-started",
        element: <GetStartedQuiz />,
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
        path: "trainer-panel",
        element: <TrainerPanel />,
      },
    ],
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
