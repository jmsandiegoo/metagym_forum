import SideImageLayout from "../layouts/SideImageLayout";
import create_edit_thread_img from "../assets/Create_Edit_Thread_Image.png";
import { Box, Container } from "@mui/material";
import ThreadForm from "../components/forms/ThreadForm";
import MainLayout from "../layouts/MainLayout";

const CreateThreadPage = () => {
  return (
    <MainLayout isAddButtonEnabled={false}>
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <SideImageLayout
          isInverted={true}
          spacing={0}
          imgAlt={"Two men exercising"}
          imgSrc={create_edit_thread_img}
          minHeight="auto"
        >
          <Box mr={10} height="auto">
            <ThreadForm />
          </Box>
        </SideImageLayout>
      </Container>
    </MainLayout>
  );
};

export default CreateThreadPage;
