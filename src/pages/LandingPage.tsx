import { Grid, Stack, Typography, Button, Box } from "@mui/material";
import SideImageLayout from "../layouts/SideImageLayout";
import login_landing_img from "../assets/Login_Landing_Image.png";
import logo_img from "../assets/Logo.png";
import Img from "../components/Image";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <SideImageLayout
      isInverted={false}
      imgAlt={"man doing pull ups"}
      imgSrc={login_landing_img}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems={"center"}
        textAlign={"center"}
      >
        <Box>
          <Img src={logo_img} />
        </Box>
        <Typography p={5}>
          Welcome to Metagym! A platform for fitness enthusiasts. Login or Sign{" "}
          <br />
          up to gain access to numerous fitness materials.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/auth/login" variant="contained">
            Login
          </Button>
          <Button variant="outlined">Signup</Button>
        </Stack>
      </Stack>
    </SideImageLayout>
  );
};

export default LandingPage;
