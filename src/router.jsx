import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { gsapLoader } from "./animation/gsapLoader";
import { lazy } from "react";

const Home = lazy(() => import("./pages/home"));
const EarlyAccess = lazy(() => import("./pages/early-access"));

export const APP_PATH = {
  HOME: "/",
  EARLY_ACCESS: "early-access",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    // loader: ,
    children: [
      {
        path: "early-access",
        element: <EarlyAccess />,
        loader: gsapLoader,
      },
      {
        path: "/",
        element: <Home />,
        loader: gsapLoader,
      },
    ],
  },

]);
export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
