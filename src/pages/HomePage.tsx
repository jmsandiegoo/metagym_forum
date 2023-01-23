import { Button, Container, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import ThreadCard from "../components/thread/ThreadCard";
import { useAppSelector } from "../hooks/reduxHooks";
import MainLayout from "../layouts/MainLayout";
import ThreadList from "../components/thread/ThreadList";
import ErrorInfoPage from "./ErrorPage";
import { Link, useLocation } from "react-router-dom";

const HomePage = () => {
  const { loading, threads } = useAppSelector((state) => state.thread);
  const location = useLocation();

  const ErrorInfoContent = () => {
    if (location.pathname === "/home" && location.search === "") {
      return (
        <ErrorInfoPage
          title="No Threads Yet"
          description="This is embarassing... There are no threads made yet"
          buttonElements={
            <Button component={Link} to="/thread/create" variant="contained">
              Create Thread
            </Button>
          }
        />
      );
    } else {
      return (
        <ErrorInfoPage
          title="Sorry, no threads found"
          description="The threads you are searching for do not exsist yet."
          buttonElements={
            <Button component={Link} to="/thread/create" variant="contained">
              Create Thread
            </Button>
          }
        />
      );
    }
  };

  return (
    <MainLayout isAddButtonEnabled>
      {loading ? (
        <LoadingSpinner text="Fetching Threads..." />
      ) : threads.length === 0 ? (
        <ErrorInfoContent />
      ) : (
        <Container>
          <ThreadList threads={threads} />
        </Container>
      )}
    </MainLayout>
  );
};

export default HomePage;
