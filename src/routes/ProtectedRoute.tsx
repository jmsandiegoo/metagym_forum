import { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

const ProtectedRoute = () => {
  const { token, authUser } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (
    authUser?.profile.userProfileId ===
      "00000000-0000-0000-0000-000000000000" &&
    location.pathname !== "/user/onboard"
  ) {
    return <Navigate to="/user/onboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
