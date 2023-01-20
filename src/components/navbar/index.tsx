import { AppBar, Box, Button, Container, Stack } from "@mui/material";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import TextInput from "../forms/TextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UserDetails from "../UserDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { signOut } from "../../store/authThunks";
import InterestInput from "../forms/InterestInput";
import SearchInput from "../forms/SearchInput";
import { SearchRequest } from "../../types";

export type SearchInputData = {
  search: SearchRequest;
};

const Navbar = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const methods = useForm<SearchInputData>({
    defaultValues: {
      search: { title: "", interests: [] },
    },
  });

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
              <Box
                component="form"
                width="100%"
                maxWidth={600}
                // onSubmit={methods.handleSubmit(searchHandler)}
              >
                <SearchInput label="Search" />
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
