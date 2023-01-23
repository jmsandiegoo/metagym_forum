import SideImageLayout from "../layouts/SideImageLayout";
import create_edit_thread_img from "../assets/Create_Edit_Thread_Image.png";
import { Box, Container } from "@mui/material";
import ThreadForm from "../components/forms/ThreadForm";
import MainLayout from "../layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchThread } from "../store/threadThunks";
import axios from "axios";
import { setErrorFeedback } from "../store/feedbackSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Thread } from "../types";
import ErrorInfoPage from "./ErrorPage";

const EditThreadPage = () => {
  const {
    currentThread,
    loading: threadLoading,
    error,
  } = useAppSelector((state) => state.thread);

  const dispatch = useAppDispatch();
  const { threadId } = useParams();

  useEffect(() => {
    if (threadId) {
      dispatch(fetchThread(threadId as string));
    }
  }, []);

  return (
    <MainLayout isAddButtonEnabled={false}>
      {error && error.status === 404 ? (
        <ErrorInfoPage
          title="404 Thread Not Found"
          description="It seems that the thread does not exist"
        />
      ) : (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <SideImageLayout
            isInverted={true}
            spacing={0}
            imgAlt={"Two men exercising"}
            imgSrc={create_edit_thread_img}
            minHeight="auto"
          >
            <Box mr={10} height="auto">
              {threadLoading || !threadId || !currentThread ? (
                <LoadingSpinner text="Initializing form please wait" />
              ) : (
                <ThreadForm thread={currentThread as Thread} />
              )}
            </Box>
          </SideImageLayout>
        </Container>
      )}
    </MainLayout>
  );
};

export default EditThreadPage;
