import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import CreateThreadPage from "../pages/CreateThreadPage";
import EditThreadPage from "../pages/EditThreadPage";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import OnboardingPage from "../pages/OnboardingPage";
import SignupPage from "../pages/SignupPage";
import ThreadPage from "../pages/ThreadPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ErrorInfoPage from "../pages/ErrorPage";

const authRoutes = {
  path: "/auth",
  element: <PublicRoute />,
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
    {
      path: ":userId",
      element: <ProfilePage />,
    },
    {
      path: ":userId/edit",
      element: <EditProfilePage />,
    },
  ],
};

const threadRoutes = {
  path: "/thread",
  element: <ProtectedRoute />,
  children: [
    {
      path: "create",
      element: <CreateThreadPage />,
    },
    {
      path: ":threadId",
      element: <ThreadPage />,
    },
    {
      path: ":threadId/edit",
      element: <EditThreadPage />,
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <ErrorInfoPage
        title={"An Error Occured"}
        description={"Please try to reload the page."}
      />
    ),
    children: [
      {
        index: true,
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      authRoutes,
      userRoutes,
      threadRoutes,
      {
        path: "*",
        element: (
          <ErrorInfoPage
            title="404 Page Not Found"
            description="The page you are looking for does not exists."
          />
        ),
      },
    ],
  },
]);
