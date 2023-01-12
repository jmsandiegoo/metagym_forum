import { Box, Fab } from "@mui/material";
import { ReactNode } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import AddIcon from "@mui/icons-material/Add";

interface MainLayoutProps {
  isAddButtonEnabled: boolean;
  children: ReactNode;
}

const MainLayout = ({ isAddButtonEnabled, children }: MainLayoutProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Navbar />
      {isAddButtonEnabled && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 50, left: 50 }}
          onClick={() => navigate("/thread/create")}
        >
          <AddIcon />
        </Fab>
      )}
      {children}
    </Box>
  );
};

export default MainLayout;
