import {
  Avatar,
  Box,
  Button,
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import RadioInput from "./RadioInput";
import CountrySelect from "./CountryInput";
import NumberInput from "./NumberInput";
import AvatarImg from "../Avatar";
import InterestInput from "./InterestInput";
import { useAppSelector } from "../../hooks/reduxHooks";

const OnboardingForm = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box component="form" px={15}>
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
                <AvatarImg
                  fallbackName="Jm San Diego"
                  height={100}
                  width={100}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Bio"
                placeholder="Share interesting things about yourself (Achievements, PRs, etc.)"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioInput label="Experience">
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
              <NumberInput label="Age" placeholder="20" min={18} max={100} />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                label="Height (m)"
                placeholder="1.72"
                min={0}
                max={3}
              />
            </Grid>
            <Grid item xs={4}>
              <NumberInput
                label="Weight (kg)"
                placeholder="71.5"
                min={0}
                max={1000}
              />
            </Grid>
            <Grid item xs={12}>
              <InterestInput label="Interests" />
            </Grid>
          </Grid>
        </div>

        <Box textAlign="end">
          <Button variant="contained" sx={{ mt: 5, mb: 2 }}>
            Finish Set up
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default OnboardingForm;
