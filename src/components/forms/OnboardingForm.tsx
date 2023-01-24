import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import RadioInput from "./RadioInput";
import CountrySelect from "./CountryInput";
import NumberInput from "./NumberInput";
import AvatarImg from "../AvatarImg";
import InterestInput from "./InterestInput";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { LoadingButton } from "@mui/lab";
import { OnboardRequest } from "../../types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextInput from "./TextInput";
import { onboard, signOut } from "../../store/authThunks";
import {
  checkNumMaxValidate,
  checkNumMinValidate,
  requiredValidate,
} from "../../utilities/helper";

const OnboardingForm = () => {
  const { loading: authLoading, authUser } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const methods = useForm<OnboardRequest>({
    defaultValues: {
      pfpUrl: "https://avatars.githubusercontent.com/u/49123896?v=4", // Just a temporary data to be changed when doing file upload in future
      bio: "",
      age: 18,
      height: 1.72,
      weight: 71.2,
      experience: "beginner",
      interests: [],
    },
  });

  // check if user has already onboarded
  if (
    authUser?.profile?.userProfileId != "00000000-0000-0000-0000-000000000000"
  ) {
    return <Navigate to="/home" replace />;
  }

  const onboardHandler: SubmitHandler<OnboardRequest> = async (
    data: OnboardRequest
  ) => {
    try {
      const _ = await dispatch(onboard(data)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        px={15}
        onSubmit={methods.handleSubmit(onboardHandler)}
      >
        <Stack spacing={2}>
          <Box pt={15}>
            <Img
              src={logo_img}
              marginProp={0}
              widthProp="auto"
              heightProp="auto"
            />
          </Box>
          <Box pt={10} pb={5} textAlign="center">
            <Typography variant="h1">Welcome to Meta Gym!</Typography>
            <Typography mt={1}>Let's set up your profile</Typography>
          </Box>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="center">
                  <Box onClick={(e) => alert("Profile photo coming soon!")}>
                    <AvatarImg
                      fallbackName="Jm San Diego"
                      height={100}
                      width={100}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="bio"
                  label="Bio"
                  TextFieldProps={{
                    multiline: true,
                    rows: 3,
                    placeholder:
                      "Share interesting things about yourself (Achievements, PRs, etc.)",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <RadioInput name="experience" label="Experience">
                  <>
                    <FormControlLabel
                      value="beginner"
                      control={<Radio />}
                      label="Beginner"
                    />
                    <FormControlLabel
                      value="intermediate"
                      control={<Radio />}
                      label="Intermediate"
                    />
                    <FormControlLabel
                      value="expert"
                      control={<Radio />}
                      label="Expert"
                    />
                  </>
                </RadioInput>
              </Grid>
              <Grid item xs={12}>
                <CountrySelect
                  validations={{
                    required: requiredValidate("Country is required"),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="age"
                  label="Age"
                  placeholder="20"
                  isFloat={false}
                  validations={{
                    required: requiredValidate("Age is required"),
                    checkNumMax: checkNumMaxValidate(
                      150,
                      "Age input cannot be older than 150"
                    ),
                    checkNumMin: checkNumMinValidate(
                      13,
                      "Age input cannot be younger than 13"
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="height"
                  label="Height (m)"
                  placeholder="1.72"
                  isFloat={true}
                  validations={{
                    required: requiredValidate("Height is required"),
                    checkNumMax: checkNumMaxValidate(
                      3,
                      "Height input can be maximum of 3.00 m"
                    ),
                    checkNumMin: checkNumMinValidate(
                      0,
                      "Height input is invalid"
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="weight"
                  label="Weight (kg)"
                  placeholder="71.5"
                  isFloat={true}
                  min={0}
                  max={1000}
                  step={0.1}
                  validations={{
                    required: requiredValidate("Weight is required"),
                    checkNumMax: checkNumMaxValidate(
                      800,
                      "Weight input is way too high"
                    ),
                    checkNumMin: checkNumMinValidate(
                      0,
                      "Weight input is invalid"
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InterestInput
                  label="Interests"
                  validations={{
                    required: requiredValidate(
                      "At least one interest is required"
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <Box>
            <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
              <Button variant="text" onClick={() => dispatch(signOut())}>
                Sign out
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={authLoading}
              >
                Finish Set up
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default OnboardingForm;
