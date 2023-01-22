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

const EditProfilePage = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          const _ = await dispatch(fetchUser(userId as string)).unwrap();
        } catch (e) {
          if (axios.isAxiosError(e)) {
            if (e.response?.status === 404) {
              // redirect to 404
            }
            dispatch(setErrorFeedback(e.response?.data?.error || e.message));
            // Error Handler
          } else {
            dispatch(setErrorFeedback("An unexpected error occured"));
          }
        }
      })();
    }
  }, []);

  if (!userId || !user) {
    // return 404
    return null;
  }

  return (
    <MainLayout isAddButtonEnabled={true}>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={5}
        >
          <Typography variant="h1">Edit Profile</Typography>
          <Button
            variant="text"
            onClick={() => navigate(`/user/${user.userId}`)}
          >
            Cancel
          </Button>
        </Stack>
        {loading ? (
          <LoadingSpinner text="Initializing form please wait" />
        ) : (
          <Stack direction="row" spacing={20}>
            <ProfileForm profile={user.profile} />
            <AccountForm user={user} />
          </Stack>
        )}
      </Container>
    </MainLayout>
  );
};

export default EditProfilePage;
