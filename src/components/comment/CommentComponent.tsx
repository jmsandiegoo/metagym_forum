import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Comment } from "../../types";
import MenuPopper, { MenuOption } from "../MenuPopper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Stack, Typography } from "@mui/material";
import UserDetails from "../UserDetails";
import VoteButtons from "../VoteButtons";
import InterestChip from "../InterestChip";

interface CommentComponentProps {
  comment: Comment;
}

const CommentComponent = ({ comment }: CommentComponentProps) => {
  const { authUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const menuOptions: MenuOption[] = [
    {
      icon: <DeleteOutlinedIcon color="primary" />,
      label: "Delete",
      onClickHandler: () => console.log("edit thread"),
    },
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
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
  );
};

export default CommentComponent;
