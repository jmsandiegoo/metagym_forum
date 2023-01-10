import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box, CssBaseline, Stack } from "@mui/material";
import theme from "./theme";
import { useAppDispatch } from "./hooks/reduxHooks";
import { getToken } from "./utilities/localStorageHelper";
import { fetchAuthUser } from "./store/authThunks";
import { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { axiosInstance } from "./utilities/httpCommon";

function App() {
  const [initializing, setInitializing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  // initialize auth and token in redux on app load and axios interceptors for jwt
  useEffect(() => {
    const setupAxiosReqInterceptor = () => {
      axiosInstance.interceptors.request.use(
        (config) => {
          const token = getToken();
          if (token) {
            config["headers"] = config.headers ?? {};
            (config.headers as RawAxiosRequestHeaders)[
              "Authorization"
            ] = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    };
    const initializeAuth = async () => {
      if (getToken()) {
        await dispatch(fetchAuthUser());
      }
      setInitializing(false);
    };
    setupAxiosReqInterceptor();
    initializeAuth();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {initializing ? (
        <Backdrop
          sx={{
            zIndex: (theme) => theme.zIndex.tooltip + 1,
          }}
          open={initializing}
        >
          <Stack alignItems="center" spacing={2}>
            <CircularProgress />
            <Typography>Initializing please wait...</Typography>
          </Stack>
        </Backdrop>
      ) : (
        <Outlet />
      )}
    </ThemeProvider>
  );
}

export default App;
