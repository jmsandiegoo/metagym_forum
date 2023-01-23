import { Stack } from "@mui/material";
import { Thread } from "../../types";
import LoadingSpinner from "../LoadingSpinner";
import ThreadCard from "./ThreadCard";

interface ThreadList {
  threads: Thread[];
}

const ThreadList = ({ threads }: ThreadList) => {
  return (
    <Stack spacing={2}>
      {threads.map((t, i) => (
        <ThreadCard key={t.threadId} thread={t} />
      ))}
    </Stack>
  );
};

export default ThreadList;
