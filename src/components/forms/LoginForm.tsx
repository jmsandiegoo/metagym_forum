import {
  Box,
  Button,
  FormControl,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo_img from "../../assets/Logo.png";
import Img from "../Image";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  return (
    <Box component="form" maxWidth="60%">
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

        <TextField
          label="Username"
          variant="standard"
          size="medium"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <PasswordInput label="Password" />
        <Link
          component={RouterLink}
          variant="body2"
          to="/forgot-password"
          sx={{ alignSelf: "flex-end" }}
        >
          Forgot Password
        </Link>
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{ alignSelf: "center", mt: 5, mb: 2 }}
          >
            Login
          </Button>
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
  );
};

export default LoginForm;
