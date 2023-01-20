import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Thread, User } from "../types";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { MenuOption } from "./MenuPopper";
import { Box, Card, CardActionArea, Stack, Typography } from "@mui/material";
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
      <CardActionArea
        component={RouterLink}
        to={`/thread/${thread.threadId}`}
        sx={{ px: 2, py: 3 }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h2">{thread.title}</Typography>
          </Stack>
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "100px",
            }}
          >
            <Typography>{thread.body}</Typography>
          </Box>
          <Stack direction="row" alignItems="center">
            <VoteButtons data={thread} />
            <UserDetails
              user={thread.user}
              isRepEnabled={false}
              date={new Date(thread.createdAt)}
            />
            <Stack
              direction="row"
              flex={1}
              justifyContent="flex-end"
              spacing={1}
            >
              {thread.interests.map((interest, i) => (
                <InterestChip label={interest.name} key={i} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default ThreadCard;
