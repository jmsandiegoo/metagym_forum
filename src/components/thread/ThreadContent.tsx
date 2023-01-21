import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Thread } from "../../types";
import MenuPopper, { MenuOption } from "../MenuPopper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Stack, Typography } from "@mui/material";
import UserDetails from "../UserDetails";
import VoteButtons from "../VoteButtons";
import InterestChip from "../InterestChip";

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

export default ThreadContent;
