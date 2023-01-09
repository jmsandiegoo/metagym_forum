import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

interface PublicRouteProps {
  children?: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token, authUser } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (token) {
    const redirectPath = location.state?.from || "/home";
    return <Navigate to={redirectPath} replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
};

export default PublicRoute;
