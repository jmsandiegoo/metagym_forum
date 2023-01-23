import { Container, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadCard from "../components/thread/ThreadCard";
import { useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";
import ThreadList from "../components/thread/ThreadList";

const HomePage = () => {
  const { loading, threads, error } = useAppSelector((state) => state.thread);
  return (
    <MainLayout isAddButtonEnabled>
      <Container>
        <ThreadList loading={loading} threads={threads} />
      </Container>
    </MainLayout>
  );
};

export default HomePage;
