import {
  Box,
  Button,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link as RouterLink } from "react-router-dom";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import logo_img from "../../assets/Logo.png";
import Img from "../Image";
import PasswordInput from "./PasswordInput";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import TextInput from "./TextInput";
import { login } from "../../store/authThunks";
import { LoginRequest } from "../../types";
import { requiredValidate } from "../../utilities/helper";

const LoginForm = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const methods = useForm<LoginRequest>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginHandler: SubmitHandler<LoginRequest> = async (
    data: LoginRequest
  ) => {
    try {
      const _ = await dispatch(login(data)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        maxWidth="70%"
        onSubmit={methods.handleSubmit(loginHandler)}
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
            <Typography variant="h1">Login to your account</Typography>
            <Typography mt={1}>
              Welcome back! Please enter your details.
            </Typography>
          </Box>
          <TextInput
            name="username"
            label="Username"
            validations={{
              required: requiredValidate("Username is required"),
            }}
          />
          <PasswordInput
            name="password"
            label="Password"
            validations={{
              required: requiredValidate("Password is required"),
            }}
          />
          {/* <Link
            component={RouterLink}
            variant="body2"
            to="/forgot-password"
            sx={{ alignSelf: "flex-end" }}
            onClick={() => console.log}
          >
            Forgot Password
          </Link> */}
          <Box textAlign="center">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              sx={{ alignSelf: "center", mt: 5, mb: 2 }}
            >
              Login
            </LoadingButton>
            <Typography variant="body2" textAlign="center">
              Don’t have an account?{" "}
              <Link
                component={RouterLink}
                variant="body2"
                to="/auth/signup"
                sx={{ alignSelf: "flex-end" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
