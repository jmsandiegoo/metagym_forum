import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ThreadRequest, ThreadResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const createThread = createAsyncThunk("thread/createThread", async (threadData: ThreadRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<ThreadResponse>("api/thread/create", threadData);
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