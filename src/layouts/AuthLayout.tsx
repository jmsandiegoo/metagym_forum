import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  isInverted: boolean;
}

const AuthLayout = ({ isInverted }: AuthLayoutProps) => {
  return (
    <Grid>
      <p>Auth Layout</p>
      <Outlet />
    </Grid>
  );
};

export default AuthLayout;
