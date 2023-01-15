import { IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useState } from "react";
import axios from "axios";
import { setErrorFeedback } from "../store/feedbackSlice";
import { Thread, Comment } from "../types";

interface VoteButtonsProps {
  data: Thread | Comment;
}

const VoteButtons = ({ data }: VoteButtonsProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [typeIsThread, setTypeIsThread] = useState<boolean>(true);
  const [voteCount, setVoteCount] = useState<number>(0);
  const [isUpvoteActive, setIsUpvoteActive] = useState<boolean>(false);
  const [isDownvoteActive, setIsDownvoteActive] = useState<boolean>(false);

  useEffect(() => {
    const upvotes = data.usersLiked ? data.usersLiked.length : 0;
    const downvotes = data.usersDisliked ? data.usersDisliked.length : 0;
    setVoteCount(upvotes - downvotes);

    // detect type
    setTypeIsThread(isThread(data));
  }, []);

  const isThread = (obj: Thread | Comment): obj is Thread => {
    return (obj as Thread).threadId !== undefined;
  };

  const handleUpvote = async () => {
    try {
      if (isUpvoteActive)
        // dispatch upvote
        // setUpvoteActive
        setVoteCount((prev) => prev + 1);
      setIsUpvoteActive(true);
      setIsDownvoteActive(false);
      if (typeIsThread) {
        console.log("upvote thread");
      } else {
        console.log("upvote comment");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
      setVoteCount((prev) => prev + 1);
      setIsUpvoteActive(false);
      setIsDownvoteActive(false);
    }
  };

  const handleDownvote = async () => {
    try {
      // dispatch downvote
      setVoteCount((prev) => prev - 1);
      setIsUpvoteActive(false);
      setIsDownvoteActive(true);
      if (typeIsThread) {
        console.log("downvote thread");
      } else {
        console.log("downvote comment");
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
      setVoteCount((prev) => prev - 1);
      setIsUpvoteActive(false);
      setIsDownvoteActive(false);
    }
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton aria-label="upvote" size="small" onClick={handleUpvote}>
        <ArrowUpwardIcon
          fontSize="small"
          {...(isUpvoteActive && { color: "primary" })}
        />
      </IconButton>
      {voteCount}
      <IconButton aria-label="downvote" size="small" onClick={handleDownvote}>
        <ArrowDownwardIcon
          fontSize="small"
          {...(isDownvoteActive && { color: "primary" })}
        />
      </IconButton>
    </Stack>
  );
};

export default VoteButtons;
