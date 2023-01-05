import { Grid } from "@mui/material";
import SideImageLayout from "../layouts/SideImageLayout";
import onboard_img from "../assets/Onboard_Image.png";
import OnboardingForm from "../components/forms/OnboardingForm";

const OnboardingPage = () => {
  return (
    <SideImageLayout
      isInverted={false}
      spacing={0}
      imgAlt={"A deadlifting picture"}
      imgSrc={onboard_img}
    >
      <OnboardingForm />
    </SideImageLayout>
  );
};

export default OnboardingPage;
