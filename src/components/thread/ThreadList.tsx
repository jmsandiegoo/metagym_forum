import { Stack } from "@mui/material";
import { Thread } from "../../types";
import LoadingSpinner from "../LoadingSpinner";
import ThreadCard from "./ThreadCard";

interface ThreadList {
  loading: boolean;
  threads: Thread[];
}

const ThreadList = ({ loading, threads }: ThreadList) => {
  return loading ? (
    <LoadingSpinner text="Fetching Threads..." />
  ) : (
    <Stack spacing={2}>
      {threads.map((t, i) => (
        <ThreadCard key={t.threadId} thread={t} />
      ))}
    </Stack>
  );
};

export default ThreadList;
