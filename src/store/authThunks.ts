import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/httpCommon";
import { SignupData } from "../types/SignupData";
import { getToken, removeToken, setToken } from "../utilities/localStorageHelper";
import axios, { AxiosError } from "axios";
import LoginData from "../types/LoginData";
import User from "../types/User";

type UserJwt = {jwt: string, user: User}

export const signup = createAsyncThunk("auth/signup", async(signupData: SignupData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwt>("/auth/signup", signupData);
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

export const login = createAsyncThunk("auth/login", async(loginData: LoginData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserJwt>("/auth/login", loginData);
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
    removeToken();
})