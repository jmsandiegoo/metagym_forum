import { Box, Grid } from "@mui/material";
import SideImageLayout from "../layouts/SideImageLayout";
import signup_img from "../assets/Signup_Image.png";
import SignupForm from "../components/forms/SignupForm";

const SignupPage = () => {
  return (
    <SideImageLayout
      isInverted={false}
      spacing={0}
      imgAlt={"A woman doing squats"}
      imgSrc={signup_img}
    >
      <Box ml={15}>
        <SignupForm />
      </Box>
    </SideImageLayout>
  );
};
export default SignupPage;
