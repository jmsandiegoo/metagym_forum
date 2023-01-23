import { Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import ProfileContent from "../components/user/ProfileContent";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { SyntheticEvent, useEffect, useState } from "react";
import { fetchUser } from "../store/userThunks";
import axios from "axios";
import { setErrorFeedback } from "../store/feedbackSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { User, Error } from "../types";
import ThreadList from "../components/thread/ThreadList";
import TabPanel from "../components/tab/TabPanel";
import ErrorInfoPage from "./ErrorPage";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const { loading, user, error } = useAppSelector((state) => state.user);
  const [value, setValue] = useState<number>(0);
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainLayout isAddButtonEnabled={true}>
      {error && error.status === 404 ? (
        <ErrorInfoPage
          title="404 User Not Found"
          description="It seems that the user does not exist"
        />
      ) : (
        <Container maxWidth="md">
          <Stack direction="row" justifyContent="flex-end" py={3}>
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
          {loading || !userId || !user ? (
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
                <Tab label="Comments" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <ThreadList threads={user.threads ?? []} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography textAlign="center">
                  Still in development.
                </Typography>
              </TabPanel>
            </Stack>
          )}
        </Container>
      )}
    </MainLayout>
  );
};

export default ProfilePage;
