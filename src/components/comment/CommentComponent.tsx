import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Comment } from "../../types";
import MenuPopper, { MenuOption } from "../MenuPopper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Stack, Typography } from "@mui/material";
import UserDetails from "../UserDetails";
import VoteButtons from "../VoteButtons";
import InterestChip from "../InterestChip";
import { useState } from "react";
import DeleteDialog from "../dialog/DeleteDialog";
import {
  setErrorFeedback,
  setSuccessFeedback,
} from "../../store/feedbackSlice";
import {
  deleteThreadComment,
  fetchThreadComments,
} from "../../store/commentThunks";
import axios from "axios";

interface CommentComponentProps {
  comment: Comment;
}

const CommentComponent = ({ comment }: CommentComponentProps) => {
  const { loading } = useAppSelector((state) => state.comment);
  const { authUser } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const menuOptions: MenuOption[] = [
    {
      icon: <DeleteOutlinedIcon color="primary" />,
      label: "Delete",
      onClickHandler: () => setOpen(true),
    },
  ];

  const handleDelete = async () => {
    try {
      await dispatch(deleteThreadComment(comment.commentId)).unwrap();
      await dispatch(fetchThreadComments(comment.threadId)).unwrap();
      dispatch(setSuccessFeedback("Comment deleted successfully"));
      setOpen(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
    }
  };

  return (
    <>
      <DeleteDialog
        open={open}
        loading={loading}
        itemName="comment"
        onClickHandler={handleDelete}
        onCloseHandler={() => setOpen(false)}
      />
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <UserDetails
            user={comment.user}
            isRepEnabled
            date={new Date(comment.createdAt)}
          />
          {comment.userId === authUser?.userId && (
            <MenuPopper options={menuOptions} />
          )}
        </Stack>

        <Typography>{comment.body}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <VoteButtons data={comment} />
        </Stack>
      </Stack>
    </>
  );
};

export default CommentComponent;
