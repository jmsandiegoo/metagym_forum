import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const fetchUser = createAsyncThunk("auth/fetcUser", async(userId: string, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<UserResponse>(`api/users/${userId}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})