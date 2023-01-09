import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import PasswordInput from "./PasswordInput";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import TextInput from "./TextInput";
import { SignupData } from "../../types/SignupData";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { signup } from "../../store/authThunks";

type SignupFormInput = { confirmPassword: string } & SignupData;

const SignupForm = () => {
  const loading = useAppSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const methods = useForm<SignupFormInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupHandler: SubmitHandler<SignupFormInput> = async (
    data: SignupFormInput
  ) => {
    const signupData: SignupData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const _ = await dispatch(signup(signupData)).unwrap();
      navigate("/user/onboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        maxWidth="70%"
        onSubmit={methods.handleSubmit(signupHandler)}
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
          <Box pt={10} pb={5}>
            <Typography variant="h1">Create a new account</Typography>
            <Typography mt={1}>
              Create an account and join the Meta Gym community!
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextInput name="firstName" label="Firstname" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="lastName" label="Lastname" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="username" label="Username" />
            </Grid>
            <Grid item xs={6}>
              <TextInput name="email" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput name="password" label="Password" />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput name="confirmPassword" label="Confirm Password" />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ alignSelf: "center", mt: 5, mb: 2 }}
            >
              Create Account
            </LoadingButton>
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
