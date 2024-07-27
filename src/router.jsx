import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import EarlyAccess from "./pages/early-access";
import MainLayout from "./components/layout/MainLayout";

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
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
