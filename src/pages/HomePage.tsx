import { Container, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadCard from "../components/ThreadCard";
import { useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";

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
  return (
    <MainLayout isAddButtonEnabled>
      <Container>
        <ThreadCardList />
      </Container>
    </MainLayout>
  );
};

export default HomePage;
