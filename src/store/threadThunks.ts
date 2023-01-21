import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { threadId } from "worker_threads";
import { SearchRequest, SearchThreadResponse, ThreadRequest, ThreadResponse, VoteRequest } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const createThread = createAsyncThunk("thread/createThread", async (threadData: ThreadRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<ThreadResponse>("api/threads/create", threadData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const fetchThread = createAsyncThunk("thread/fetchThread", async (threadId: string, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<ThreadResponse>(`api/threads/${threadId}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
 
export const updateThread = createAsyncThunk("thread/updateThread", async (threadData: ThreadRequest, thunkAPI) => {
    try {
        const threadId: string = threadData.threadId as string
        delete threadData["threadId"]
        const {data} = await axiosInstance.put<ThreadResponse>(`api/threads/${threadId}`, threadData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const upvoteThread = createAsyncThunk("thread/upvoteThread", async (voteData : VoteRequest, thunkAPI) => {
    try {
        const threadId: string = voteData.threadId as string
        await axiosInstance.post(`api/threads/upvote/${threadId}`, {flag: voteData.flag});
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const downvoteThread = createAsyncThunk("thread/downvoteThread", async (voteData : VoteRequest, thunkAPI) => {
    try {
        const threadId: string = voteData.threadId as string
        await axiosInstance.post(`api/threads/downvote/${threadId}`, {flag: voteData.flag});
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const searchThread = createAsyncThunk("thread/searchThread", async (searchData : SearchRequest, thunkAPI) => {
    try {
        console.log(searchData);
        let queryparams: string = `?`
        if (searchData.title) {
            queryparams += `title=${searchData.title}`;
        }
        
        if (searchData.interests) {
            for (let i = 0; i < searchData.interests.length; i++) {
                if (searchData.title || i > 0) {
                    queryparams += "&"
                }
                queryparams += `interests=${searchData.interests[i]}`
            }
        }

        const {data} = await axiosInstance.get<SearchThreadResponse>(`api/search${queryparams}`);
        return data;

    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})