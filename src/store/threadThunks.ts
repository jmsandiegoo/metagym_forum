import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { threadId } from "worker_threads";
import { SearchRequest, SearchThreadResponse, ThreadRequest, ThreadResponse, VoteRequest } from "../types";
import { axiosInstance } from "../utilities/httpCommon";
import { mapQueryString } from "../utilities/helper";
import { setErrorFeedback, setSuccessFeedback } from "./feedbackSlice";
import { Error } from "../types";

export const createThread = createAsyncThunk<
ThreadResponse,
ThreadRequest,
{
    rejectValue: Error
}
>("thread/createThread", async (threadData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<ThreadResponse>("api/threads/create", threadData);
        thunkAPI.dispatch(setSuccessFeedback("Thread created successfully"));
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

export const fetchThread = createAsyncThunk<
    ThreadResponse,
    string,
    {
        rejectValue: Error
    }
>("thread/fetchThread", async (threadId, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<ThreadResponse>(`api/threads/${threadId}`);
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
 
export const updateThread = createAsyncThunk<
ThreadResponse,
ThreadRequest,
{
    rejectValue: Error
}
>("thread/updateThread", async (threadData, thunkAPI) => {
    try {
        const threadId: string = threadData.threadId as string
        delete threadData["threadId"]
        const {data} = await axiosInstance.put<ThreadResponse>(`api/threads/${threadId}`, threadData);
        thunkAPI.dispatch(setSuccessFeedback("Thread edited successfully"));
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

export const deleteThread = createAsyncThunk<
void,
string,
{
    rejectValue: Error
}
>("thread/deleteThread", async (threadId: string, thunkAPI) => {
    try {
        await axiosInstance.delete(`api/threads/${threadId}`);
        thunkAPI.dispatch(setSuccessFeedback("Thread deleted successfully"));
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

export const upvoteThread = createAsyncThunk<
void,
VoteRequest,
{
    rejectValue: Error
}
>("thread/upvoteThread", async (voteData, thunkAPI) => {
    try {
        const threadId: string = voteData.threadId as string
        await axiosInstance.post(`api/threads/upvote/${threadId}`, {flag: voteData.flag});
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

export const downvoteThread = createAsyncThunk<
void,
VoteRequest,
{
    rejectValue: Error
}
>("thread/downvoteThread", async (voteData, thunkAPI) => {
    try {
        const threadId: string = voteData.threadId as string
        await axiosInstance.post(`api/threads/downvote/${threadId}`, {flag: voteData.flag});
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

export const searchThread = createAsyncThunk<
SearchThreadResponse,
SearchRequest,
{
    rejectValue: Error
}
>("thread/searchThread", async (searchData : SearchRequest, thunkAPI) => {
    try {
        const queryString = mapQueryString(searchData);
        const {data} = await axiosInstance.get<SearchThreadResponse>(`api/search${queryString}`);
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