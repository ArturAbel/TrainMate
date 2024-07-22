import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Trainers from "./pages/Trainers/Trainers";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import TrainerDetails from "./pages/Trainer-detalis/TrainerDetalis";

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
        path: "trainers",
        element: <Trainers />,
      },
      {
        path: "trainers/:id",
        element: <TrainerDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
