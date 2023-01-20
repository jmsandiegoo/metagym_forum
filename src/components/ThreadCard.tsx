import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Thread, User } from "../types";
import { useNavigate } from "react-router-dom";
import { MenuOption } from "./MenuPopper";
import { Card, Stack, Typography } from "@mui/material";
import VoteButtons from "./VoteButtons";
import InterestChip from "./InterestChip";
import UserDetails from "./UserDetails";
import { useAppSelector } from "../hooks/reduxHooks";

interface ThreadCardProps {
  thread: Thread;
}

const ThreadCard = ({ thread }: ThreadCardProps) => {
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
    <Card>
      <Stack spacing={2}>
        <Typography variant="h2">{thread.title}</Typography>
      </Stack>
      <Typography>{thread.body}</Typography>
      <Stack direction="row">
        <VoteButtons data={thread} />
        <UserDetails
          user={thread.user}
          isRepEnabled={false}
          date={new Date(thread.createdAt)}
        />
        <Stack direction="row">
          {thread.interests.map((interest, i) => (
            <InterestChip label={interest.name} key={i} />
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ThreadCard;
