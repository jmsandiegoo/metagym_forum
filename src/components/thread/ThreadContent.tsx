import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Thread } from "../../types";
import MenuPopper, { MenuOption } from "../MenuPopper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Stack, Typography } from "@mui/material";
import UserDetails from "../UserDetails";
import VoteButtons from "../VoteButtons";
import InterestChip from "../InterestChip";
import { useState } from "react";
import { deleteThread } from "../../store/threadThunks";
import {
  setErrorFeedback,
  setSuccessFeedback,
} from "../../store/feedbackSlice";
import axios from "axios";
import DeleteDialog from "../dialog/DeleteDialog";

interface ThreadContentProps {
  thread: Thread;
  loading: boolean;
}

const ThreadContent = ({ thread, loading }: ThreadContentProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
      onClickHandler: () => setOpen(true),
    },
  ];

  // delete Thread
  const handleDelete = async () => {
    try {
      await dispatch(deleteThread(thread.threadId)).unwrap();
      dispatch(setSuccessFeedback("Thread deleted successfully"));
      setOpen(false);
      navigate("/home");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
    }
  };

  return (
    <Stack spacing={2}>
      <DeleteDialog
        open={open}
        loading={loading}
        itemName="thread"
        onClickHandler={handleDelete}
        onCloseHandler={() => setOpen(false)}
      />
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

export default ThreadContent;
