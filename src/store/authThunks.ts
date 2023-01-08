import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utilities/httpCommon";
import { SignupData } from "../types/SignupData";
import { getToken, setToken } from "../utilities/localStorageHelper";
import UserProfile from "../types/UserProfile";
import axios, { AxiosError } from "axios";

type UserProfileJwt = {jwt: string, user: UserProfile}

export const signup = createAsyncThunk('auth/signup', async(signupData: SignupData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<UserProfileJwt>("/auth/signup", signupData);
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