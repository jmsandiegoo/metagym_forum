import { Grid } from "@mui/material";
import SideImageLayout from "../layouts/SideImageLayout";
import signup_img from "../assets/Signup_Image.png";
import SignupForm from "../components/forms/SignupForm";

const SignupPage = () => {
  return (
    <SideImageLayout
      isInverted={false}
      spacing={15}
      imgAlt={"A woman doing squats"}
      imgSrc={signup_img}
    >
      <SignupForm />
    </SideImageLayout>
  );
};
export default SignupPage;
