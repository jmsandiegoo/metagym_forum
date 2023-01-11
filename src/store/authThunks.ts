import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "../utilities/httpCommon";
import { getToken, removeToken, setToken } from "../utilities/localStorageHelper";
import axios from "axios";
import { LoginRequest, OnboardRequest, SignupRequest, UserJwtResponse, UserResponse, UserProfileResponse } from "../types";

export const signup = createAsyncThunk("auth/signup", async(signupData: SignupRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwtResponse>("/auth/signup", signupData);
        setToken(data.jwt);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            console.log('unexpected error: ', error);
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
})

export const login = createAsyncThunk("auth/login", async(loginData: LoginRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwtResponse>("/auth/login", loginData);
        setToken(data.jwt);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            console.log('unexpected error: ', error);
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
})

export const signOut = createAsyncThunk("auth/signout", async () => {
    removeToken()
})

export const onboard = createAsyncThunk("auth/onboard", async (onboardData: OnboardRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserProfileResponse>("api/user/onboard", onboardData)
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            console.log('unexpected error: ', error);
            console.error(error)
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
})

export const fetchAuthUser = createAsyncThunk("auth/fetcAuthUser", async(_, thunkAPI) => {
    try {
        const token = getToken();
        const {data} = await axiosInstance.get<UserResponse>("api/user/auth-user");
        const payload: UserJwtResponse = {
            jwt: token as string,
            user: data.user
        }
        return payload;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            console.log('unexpected error: ', error);
            console.error(error)
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
})