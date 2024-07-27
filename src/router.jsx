import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import EarlyAccess from "./pages/early-access";
import MainLayout from "./components/layout/MainLayout";
import { gsapLoader } from "./animation/gsapLoader";

export const APP_PATH = {
  HOME: "/",
  EARLY_ACCESS: "early-access",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "early-access",
        element: <EarlyAccess />,
        loader: gsapLoader
      },
      {
        path: "/",
        element: <Home />,
        loader: gsapLoader
      },
    ],
  },
]);
export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
