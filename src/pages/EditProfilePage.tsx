import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import SignupForm from "../components/forms/SignupForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchUser } from "../store/userThunks";
import { setErrorFeedback } from "../store/feedbackSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ProfileForm from "../components/forms/ProfileForm";
import LoadingSpinner from "../components/LoadingSpinner";
import AccountForm from "../components/forms/AccountForm";
import ErrorInfoPage from "./ErrorPage";

const EditProfilePage = () => {
  const { loading, user, error } = useAppSelector((state) => state.user);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId as string));
    }
  }, []);

  return (
    <MainLayout isAddButtonEnabled={true}>
      {error && error.status === 404 ? (
        <ErrorInfoPage
          title="404 User Not Found"
          description="It seems that the user does not exist"
        />
      ) : (
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={5}
          >
            <Typography variant="h1">Edit Profile</Typography>
            <Button variant="text" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Stack>
          {loading || !userId || !user ? (
            <LoadingSpinner text="Initializing form please wait" />
          ) : (
            <Stack direction="row" spacing={20}>
              <ProfileForm profile={user.profile} />
              <AccountForm user={user} />
            </Stack>
          )}
        </Container>
      )}
    </MainLayout>
  );
};

export default EditProfilePage;
