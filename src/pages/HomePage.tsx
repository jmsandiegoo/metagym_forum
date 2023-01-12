import { Container } from "@mui/material";
import MainLayout from "../layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout isAddButtonEnabled>
      <Container>
        <p>Homepage</p>
      </Container>
    </MainLayout>
  );
};

export default HomePage;
