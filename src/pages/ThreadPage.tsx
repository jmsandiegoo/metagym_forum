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
import ErrorInfoPage from "./ErrorPage";

const ThreadPage = () => {
  const {
    loading: threadLoading,
    error,
    currentThread,
  } = useAppSelector((state) => state.thread);
  const { comments } = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();
  const { threadId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (threadId) {
      (async () => {
        await dispatch(fetchThread(threadId as string));
        await dispatch(fetchThreadComments(threadId as string));
      })();
    }
  }, []);

  return (
    <MainLayout isAddButtonEnabled={true}>
      {error && error.status === 404 ? (
        <ErrorInfoPage
          title="404 Thread Not Found"
          description="It seems that the thread does not exist"
        />
      ) : (
        <Container>
          <Stack direction="row" justifyContent="flex-end" py={3}>
            <Button variant="text" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Stack>
          {threadLoading || !threadId || !currentThread ? (
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
      )}
    </MainLayout>
  );
};

export default ThreadPage;
