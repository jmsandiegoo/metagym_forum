import { Box, Grid, Stack, Typography } from "@mui/material";
import SideImageLayout from "../layouts/SideImageLayout";
import login_landing_img from "../assets/Login_Landing_Image.png";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <SideImageLayout
      isInverted={false}
      spacing={0}
      imgAlt={"A man doing pull ups"}
      imgSrc={login_landing_img}
    >
      <Box ml={10}>
        <LoginForm />
      </Box>
    </SideImageLayout>
  );
};

export default LoginPage;
