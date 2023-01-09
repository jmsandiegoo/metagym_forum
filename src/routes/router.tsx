import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import OnboardingPage from "../pages/OnboardingPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";

const authRoutes = {
  path: "/auth",
  children: [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignupPage />,
    },
  ],
};

const userRoutes = {
  path: "/user",
  element: <ProtectedRoute />,
  children: [
    {
      path: "onboard",
      element: <OnboardingPage />,
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      authRoutes,
      userRoutes,
    ],
  },
]);
