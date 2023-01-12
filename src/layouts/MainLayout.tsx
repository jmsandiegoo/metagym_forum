import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box>
      <Navbar />
      {children}
    </Box>
  );
};

export default MainLayout;
