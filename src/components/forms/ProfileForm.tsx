import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfileRequest, UserProfile } from "../../types";
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import Img from "../Image";
import AvatarImg from "../AvatarImg";
import TextInput from "./TextInput";
import RadioInput from "./RadioInput";
import CountrySelect from "./CountryInput";
import { LoadingButton } from "@mui/lab";
import InterestInput from "./InterestInput";
import NumberInput from "./NumberInput";
import { useAppSelector } from "../../hooks/reduxHooks";

interface ProfileFormProps {
  profile: UserProfile;
}

const ProfileForm = ({ profile }: ProfileFormProps) => {
  const { loading } = useAppSelector((state) => state.user);

  const methods = useForm<UpdateProfileRequest>({
    defaultValues: {
      userProfileId: profile.userProfileId,
      pfpUrl: profile.pfpUrl, // Just a temporary data to be changed when doing file upload in future
      bio: profile.bio,
      experience: profile.experience,
      country: profile.country,
      age: profile.age,
      height: profile.height,
      weight: profile.weight,
      interests: profile.interests?.map((i) => i.interestId) ?? [],
    },
  });

  const updateProfileHandler: SubmitHandler<UpdateProfileRequest> = async (
    data: UpdateProfileRequest
  ) => {
    console.log(data);
    alert("Still under development!");
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(updateProfileHandler)}
      >
        <Stack spacing={5}>
          <Typography variant="h2">Profile Details</Typography>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack direction="row">
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
                <CountrySelect />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="age"
                  label="Age"
                  placeholder="20"
                  min={18}
                  max={100}
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="height"
                  label="Height (m)"
                  placeholder="1.72"
                  min={0}
                  max={3}
                  step={0.01}
                />
              </Grid>
              <Grid item xs={4}>
                <NumberInput
                  name="weight"
                  label="Weight (kg)"
                  placeholder="71.5"
                  min={0}
                  max={1000}
                  step={0.1}
                />
              </Grid>
              <Grid item xs={12}>
                <InterestInput label="Interests" />
              </Grid>
            </Grid>
          </div>
          <Box>
            <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading}
              >
                Save
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default ProfileForm;
