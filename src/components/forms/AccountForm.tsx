import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { UpdateAccountRequest, User } from "../../types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Img from "../Image";
import TextInput from "./TextInput";
import { LoadingButton } from "@mui/lab";
import PasswordInput from "./PasswordInput";
import { useAppSelector } from "../../hooks/reduxHooks";

interface AccountFormProps {
  user: User;
}

type AccountFormInput = { confirmPassword: string } & UpdateAccountRequest;

const AccountForm = ({ user }: AccountFormProps) => {
  const { loading } = useAppSelector((state) => state.user);

  const methods = useForm<AccountFormInput>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
    },
  });

  const updateAccountHandler: SubmitHandler<AccountFormInput> = async (
    data: AccountFormInput
  ) => {
    console.log(data);
    alert("Still under development!");
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(updateAccountHandler)}
      >
        <Stack spacing={5}>
          <Typography variant="h2">Account Details</Typography>
          <Grid container spacing={5}>
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
              <PasswordInput name="password" label="New Password" />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                name="confirmPassword"
                label="Confirm New Password"
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-end" spacing={1} mt={3}>
            <LoadingButton type="submit" variant="contained" loading={loading}>
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};

export default AccountForm;
