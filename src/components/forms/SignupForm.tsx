import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import PasswordInput from "./PasswordInput";
import { Link as RouterLink } from "react-router-dom";

const SignupForm = () => {
  return (
    <Box component="form" maxWidth="70%">
      <Stack spacing={2}>
        <Box pt={15}>
          <Img
            src={logo_img}
            marginProp={0}
            widthProp="auto"
            heightProp="auto"
          />
        </Box>
        <Box pt={10} pb={5}>
          <Typography variant="h1">Create a new account</Typography>
          <Typography mt={1}>
            Create an account and join the Meta Gym community!
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Firstname" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Lastname" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Username" />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput label="Password" />
          </Grid>
          <Grid item xs={12}>
            <PasswordInput label="Confirm Password" />
          </Grid>
        </Grid>
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{ alignSelf: "center", mt: 5, mb: 2 }}
          >
            Create Account
          </Button>
          <Typography variant="body2" textAlign="center">
            Already have an account?{" "}
            <Link component={RouterLink} variant="body2" to="/auth/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SignupForm;
