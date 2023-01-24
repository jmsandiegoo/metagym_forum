import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../utilities/httpCommon";
import { getToken, removeToken, setToken } from "../utilities/localStorageHelper";
import axios from "axios";
import { Error, LoginRequest, OnboardRequest, SignupRequest, UserJwtResponse, UserResponse, UserProfileResponse } from "../types";
import { setErrorFeedback, setSuccessFeedback } from "./feedbackSlice";

export const signup = createAsyncThunk<
UserJwtResponse,
SignupRequest,
{
    rejectValue: Error
}
>("auth/signup", async(signupData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwtResponse>("/auth/signup", signupData);
        setToken(data.jwt);
        return data;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: error.response?.data?.error as string || error.message
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})

export const login = createAsyncThunk<
UserJwtResponse,
LoginRequest,
{
    rejectValue: Error
}
>("auth/login", async(loginData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwtResponse>("/auth/login", loginData);
        setToken(data.jwt);
        return data;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: error.response?.data?.error as string || error.message
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})

export const signOut = createAsyncThunk("auth/signout", async () => {
    removeToken()
})

export const onboard = createAsyncThunk<
UserProfileResponse,
OnboardRequest,
{
    rejectValue: Error
}
>("auth/onboard", async (onboardData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserProfileResponse>("api/users/onboard", onboardData)
        thunkAPI.dispatch(setSuccessFeedback("Welcome to MetaGym!"));
        return data;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: error.response?.data?.error as string || error.message
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})

export const fetchAuthUser = createAsyncThunk<
UserJwtResponse,
void,
{
    rejectValue: Error
}
>("auth/fetcAuthUser", async(_, thunkAPI) => {
    try {
        const token = getToken();
        const {data} = await axiosInstance.get<UserResponse>("api/users/auth-user");
        const payload: UserJwtResponse = {
            jwt: token as string,
            user: data.user
        }
        return payload;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: error.response?.data?.error as string || error.message
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})