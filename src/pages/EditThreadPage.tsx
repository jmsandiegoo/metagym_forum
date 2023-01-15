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

const EditThreadPage = () => {
  const { currentThread } = useAppSelector((state) => state.thread);
  const { authUser } = useAppSelector((state) => state.auth);
  const { loading: threadLoading } = useAppSelector((state) => state.thread);

  const dispatch = useAppDispatch();
  const { threadId } = useParams();

  useEffect(() => {
    if (threadId) {
      (async () => {
        try {
          const _ = await dispatch(fetchThread(threadId as string)).unwrap();
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

  if (!threadId || !currentThread) {
    // return 404
    return null;
  }

  return (
    <MainLayout isAddButtonEnabled={false}>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <SideImageLayout
          isInverted={true}
          spacing={0}
          imgAlt={"Two men exercising"}
          imgSrc={create_edit_thread_img}
          minHeight="auto"
        >
          <Box mr={10} height="auto">
            {threadLoading ? (
              <LoadingSpinner text="Initializing form please wait" />
            ) : (
              <ThreadForm thread={currentThread as Thread} />
            )}
          </Box>
        </SideImageLayout>
      </Container>
    </MainLayout>
  );
};

export default EditThreadPage;
