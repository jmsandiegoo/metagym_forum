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
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import TextInput from "./TextInput";

const SignupForm = () => {
  const methods: UseFormReturn<FieldValues, any> = useForm();

  return (
    <FormProvider {...methods}>
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
              <TextInput name="firstname" label="Firstname" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="lastname" label="Lastname" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="username" label="Username" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="email" label="Email" />
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
    </FormProvider>
  );
};

export default SignupForm;
