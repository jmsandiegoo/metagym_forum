import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/comment/CommentList";
import CommentForm from "../components/forms/CommentForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadContent from "../components/thread/ThreadContent";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";
import { fetchThreadComments } from "../store/commentThunks";
import { setErrorFeedback } from "../store/feedbackSlice";
import { fetchThread } from "../store/threadThunks";
import { Thread } from "../types";

const ThreadPage = () => {
  const { loading: threadLoading } = useAppSelector((state) => state.thread);
  const { currentThread } = useAppSelector((state) => state.thread);
  const { comments } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const { threadId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (threadId) {
      (async () => {
        try {
          await dispatch(fetchThread(threadId as string)).unwrap();
          await dispatch(fetchThreadComments(threadId as string)).unwrap();
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
    <MainLayout isAddButtonEnabled={true}>
      <Container>
        <Stack direction="row" justifyContent="flex-end" py={3}>
          <Button variant="text" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
        {threadLoading ? (
          <LoadingSpinner text="Fetching thread details" />
        ) : (
          <Stack spacing={2}>
            <ThreadContent
              thread={currentThread as Thread}
              loading={threadLoading}
            />
            <CommentForm threadId={currentThread.threadId} />
            <CommentList comments={comments} />
          </Stack>
        )}
      </Container>
    </MainLayout>
  );
};

export default ThreadPage;
