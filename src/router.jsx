import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { gsapLoader } from "./animation/gsapLoader";
import { lazy } from "react";
import DatasetsPage from "./pages/datasets";

const Home = lazy(() => import("./pages/home"));
const EarlyAccess = lazy(() => import("./pages/early-access"));

export const APP_PATH = {
  HOME: "/",
  EARLY_ACCESS: "/early-access",
  DATASETS: "/datasets",
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
      {
        path: "datasets",
        element: <DatasetsPage />,
        loader: gsapLoader,
      }
    ],
  },

]);
export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
