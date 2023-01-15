import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { threadId } from "worker_threads";
import { ThreadRequest, ThreadResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const createThread = createAsyncThunk("thread/createThread", async (threadData: ThreadRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<ThreadResponse>("api/thread/create", threadData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const fetchThread = createAsyncThunk("thread/fetchThread", async (threadId: string, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<ThreadResponse>(`api/thread/${threadId}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
 
export const updateThread = createAsyncThunk("thread/updateThread", async (threadData: ThreadRequest, thunkAPI) => {
    try {
        const threadId = threadData.threadId as string
        delete threadData["threadId"]
        const {data} = await axiosInstance.put<ThreadResponse>(`api/thread/${threadId}`, threadData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})