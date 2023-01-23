import { AppBar, Box, Button, Container, Stack } from "@mui/material";
import Img from "../Image";
import logo_img from "../../assets/Logo.png";
import TextInput from "../forms/TextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UserDetails from "../user/UserDetails";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { signOut } from "../../store/authThunks";
import InterestInput from "../forms/InterestInput";
import SearchInput from "../forms/SearchInput";
import { SearchRequest } from "../../types";
import { searchThread } from "../../store/threadThunks";
import axios from "axios";
import { setErrorFeedback } from "../../store/feedbackSlice";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { mapQueryString } from "../../utilities/helper";
import { useEffect } from "react";

export type SearchInputData = {
  search: SearchRequest;
};

const Navbar = () => {
  const { authUser } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      (async () => {
        const searchData: SearchRequest = {
          title: searchParams.get("title") ?? "",
          interests: searchParams.getAll("interests"),
        };
        try {
          await dispatch(searchThread(searchData)).unwrap();
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [location]);

  const methods = useForm<SearchInputData>({
    defaultValues: {
      search: {
        title: searchParams.get("title") ?? "",
        interests: searchParams.getAll("interests"),
      },
    },
  });

  // when there is change in the

  const searchHandler: SubmitHandler<SearchInputData> = async (
    data: SearchInputData
  ) => {
    try {
      console.log(data);
      await dispatch(searchThread(data.search)).unwrap();
      let queryString = mapQueryString(data.search);
      navigate({
        pathname: "/home",
        search: queryString,
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(setErrorFeedback(e.response?.data?.error || e.message));
      } else {
        dispatch(setErrorFeedback("An unexpected error occured"));
      }
    }
  };

  return (
    <AppBar position="relative">
      <Container maxWidth="xl">
        <Stack
          direction="row"
          py={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box onClick={() => navigate("/home")} sx={{ cursor: "pointer" }}>
            <Img
              src={logo_img}
              marginProp={0}
              widthProp={"200px"}
              heightProp="auto"
            />
          </Box>

          {/* TODO SEARCH */}
          <Stack direction="row" justifyContent="center" flexGrow={1}>
            <FormProvider {...methods}>
              <Box component="form" width="100%" maxWidth={600}>
                <SearchInput label="Search" submitHandler={searchHandler} />
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
