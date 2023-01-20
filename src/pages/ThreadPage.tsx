import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InterestChip from "../components/InterestChip";
import LoadingSpinner from "../components/LoadingSpinner";
import MenuPopper, { MenuOption } from "../components/MenuPopper";
import UserDetails from "../components/UserDetails";
import VoteButtons from "../components/VoteButtons";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";
import { setErrorFeedback } from "../store/feedbackSlice";
import { fetchThread } from "../store/threadThunks";
import { Thread, User } from "../types";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { current } from "@reduxjs/toolkit";

// const ThreadComments = () => {};

interface ThreadContentProps {
  thread: Thread;
}

const ThreadContent = ({ thread }: ThreadContentProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const menuOptions: MenuOption[] = [
    {
      icon: <EditOutlinedIcon color="primary" />,
      label: "Edit",
      onClickHandler: () => navigate(`/thread/${thread.threadId}/edit`),
    },
    {
      icon: <DeleteOutlinedIcon color="primary" />,
      label: "Delete",
      onClickHandler: () => console.log("edit thread"),
    },
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">{thread.title}</Typography>
        {thread.user.userId === authUser?.userId && (
          <MenuPopper options={menuOptions} />
        )}
      </Stack>
      <UserDetails
        user={thread.user}
        isRepEnabled
        date={new Date(thread.createdAt)}
      />
      <Typography>{thread.body}</Typography>
      <Stack direction="row" justifyContent="space-between">
        <VoteButtons data={thread} />
        <Stack direction="row" spacing={1}>
          {thread.interests.map((interest, i) => (
            <InterestChip label={interest.name} key={i} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

const ThreadPage = () => {
  const { loading: threadLoading } = useAppSelector((state) => state.thread);
  const { currentThread } = useAppSelector((state) => state.thread);
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
    <MainLayout isAddButtonEnabled={true}>
      <Container>
        <Stack direction="row" justifyContent="flex-end" py={3}>
          <Button variant="text">Back</Button>
        </Stack>
        {threadLoading ? (
          <LoadingSpinner text="Fetching Thread Details" />
        ) : (
          <>
            <ThreadContent thread={currentThread as Thread} />
          </>
        )}
      </Container>
    </MainLayout>
  );
};

export default ThreadPage;
