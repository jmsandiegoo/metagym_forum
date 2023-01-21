import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CommentRequest, CommentResponse, CommentsResponse, VoteRequest } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const fetchThreadComments = createAsyncThunk("comment/fetchThreadComments", async (threadId: string, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<CommentsResponse>(`api/comments/${threadId}`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createThreadComment = createAsyncThunk("comment/createThreadComment", async (commentData: CommentRequest, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<CommentResponse>(`api/comments/create`, commentData);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteThreadComment = createAsyncThunk("comment/deleteThreadComment", async (commentId: string, thunkAPI) => {
    try {
        await axiosInstance.delete(`api/comments/${commentId}`);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const upvoteComment = createAsyncThunk("comment/upvoteComment", async (voteData : VoteRequest, thunkAPI) => {
    try {
        const commentId: string = voteData.commentId as string
        await axiosInstance.post(`api/comments/upvote/${commentId}`, {flag: voteData.flag});
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const downvoteComment = createAsyncThunk("comment/downvoteComment", async (voteData : VoteRequest, thunkAPI) => {
    try {
        const commentId: string = voteData.commentId as string
        await axiosInstance.post(`api/comments/downvote/${commentId}`, {flag: voteData.flag});
    } catch (error) {
        console.log("error occurred");
        return thunkAPI.rejectWithValue(error);
    }
})