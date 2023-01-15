import { AppBar, Box, Button, Container, Stack } from "@mui/material";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import TextInput from "../forms/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import UserDetails from "../UserDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { signOut } from "../../store/authThunks";

interface SearchReq {
  interests: string[];
}

const Navbar = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const methods = useForm<SearchReq>();
  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          py={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Img
            src={logo_img}
            marginProp={0}
            widthProp={"200px"}
            heightProp="auto"
          />
          {/* TODO SEARCH */}
          <Stack direction="row" justifyContent="center" flexGrow={1}>
            <FormProvider {...methods}>
              <Box width="100%" maxWidth={600}>
                <TextInput name="search" label="Search Threads" />
              </Box>
            </FormProvider>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={10}
          >
            <UserDetails user={authUser} isRepEnabled />
            <Button
              variant="outlined"
              sx={{ paddingRight: 1, paddingLeft: 1 }}
              onClick={() => dispatch(signOut())}
            >
              Sign Out
            </Button>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Navbar;
