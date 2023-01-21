import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Comment } from "../../types";
import CommentComponent from "./CommentComponent";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <Stack spacing={5}>
      <Typography>
        {comments.length} Comment{comments.length > 1 && "s"}
        <MessageOutlinedIcon sx={{ ml: 2, verticalAlign: "middle" }} />
      </Typography>
      <Stack spacing={4}>
        {comments.map((c) => (
          <CommentComponent comment={c} key={c.commentId} />
        ))}
      </Stack>
    </Stack>
  );
};

export default CommentList;
