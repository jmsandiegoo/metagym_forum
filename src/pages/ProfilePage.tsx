import { Button, Container, Stack, Tab, Tabs } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import ProfileContent from "../components/user/ProfileContent";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { SyntheticEvent, useEffect, useState } from "react";
import { fetchUser } from "../store/userThunks";
import axios from "axios";
import { setErrorFeedback } from "../store/feedbackSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { User } from "../types";
import ThreadList from "../components/thread/ThreadList";
import TabPanel from "../components/tab/TabPanel";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const { loading, user } = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      (async () => {
        try {
          await dispatch(fetchUser(userId)).unwrap();
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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!userId || !user) {
    return null;
  }

  return (
    <MainLayout isAddButtonEnabled={true}>
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="flex-end" py={3}>
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
        {loading ? (
          <LoadingSpinner text="Fetching user details" />
        ) : (
          <Stack spacing={2}>
            <ProfileContent user={user} />
            <Tabs
              value={value}
              onChange={handleChange}
              //   textColor="inherit"
              variant="fullWidth"
              aria-label="profile-tabs"
            >
              <Tab label="Threads" {...a11yProps(0)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <ThreadList threads={user.threads ?? []} loading={loading} />
            </TabPanel>
          </Stack>
        )}
      </Container>
    </MainLayout>
  );
};

export default ProfilePage;
