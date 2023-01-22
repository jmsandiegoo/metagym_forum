import { Container, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadCard from "../components/thread/ThreadCard";
import { useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";
import ThreadList from "../components/thread/ThreadList";

const ThreadCardList = () => {
  const { loading, threads } = useAppSelector((state) => state.thread);

  return loading ? (
    <LoadingSpinner text="Fetching Threads..." />
  ) : (
    <Stack spacing={2}>
      {threads.map((t, i) => (
        <ThreadCard key={i} thread={t} />
      ))}
    </Stack>
  );
};

const HomePage = () => {
  const { loading, threads } = useAppSelector((state) => state.thread);
  return (
    <MainLayout isAddButtonEnabled>
      <Container>
        <ThreadList loading={loading} threads={threads} />
      </Container>
    </MainLayout>
  );
};

export default HomePage;
