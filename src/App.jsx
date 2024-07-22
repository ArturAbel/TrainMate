import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Trainers from "./pages/Trainers/Trainers";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import UserSettings from "./pages/UserSettings/UserSettings";
import GetStartedQuiz from "./components/GetStartedQuiz/GetStartedQuiz";

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
        path: "settings",
        element: <UserSettings />,
      },
      {
        path: "get-started",
        element: <GetStartedQuiz />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
