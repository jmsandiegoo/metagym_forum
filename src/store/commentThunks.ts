import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Error, CommentRequest, CommentResponse, CommentsResponse, VoteRequest } from "../types";
import { axiosInstance } from "../utilities/httpCommon";
import { setErrorFeedback, setSuccessFeedback } from "./feedbackSlice";

export const fetchThreadComments = createAsyncThunk<
CommentsResponse,
string,
{
    rejectValue: Error
}
>("comment/fetchThreadComments", async (threadId, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<CommentsResponse>(`api/comments/${threadId}`);
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

export const createThreadComment = createAsyncThunk<
CommentResponse,
CommentRequest,
{
    rejectValue: Error
}
>("comment/createThreadComment", async (commentData, thunkAPI) => {
    try {
        const {data} = await axiosInstance.post<CommentResponse>(`api/comments/create`, commentData);
        thunkAPI.dispatch(setSuccessFeedback("Comment created successfully"));
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

export const updateThreadComment = createAsyncThunk<
CommentResponse,
CommentRequest,
{
    rejectValue: Error
}
>("comment/updateThreadComment", async (commentData, thunkAPI) => {
    try {
        const commentId: string = commentData.commentId as string
        delete commentData["commentId"]
        const {data} = await axiosInstance.put<CommentResponse>(`api/comments/${commentId}`, commentData);
        thunkAPI.dispatch(setSuccessFeedback("Comment edited successfully"));
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


export const deleteThreadComment = createAsyncThunk<
void,
string,
{
    rejectValue: Error
}
>("comment/deleteThreadComment", async (commentId, thunkAPI) => {
    try {
        await axiosInstance.delete(`api/comments/${commentId}`);
        thunkAPI.dispatch(setSuccessFeedback("Comment deleted successfully"));
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

export const upvoteComment = createAsyncThunk<
void,
VoteRequest,
{
    rejectValue: Error
}
>("comment/upvoteComment", async (voteData, thunkAPI) => {
    try {
        const commentId: string = voteData.commentId as string
        await axiosInstance.post(`api/comments/upvote/${commentId}`, {flag: voteData.flag});
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

export const downvoteComment = createAsyncThunk<
void,
VoteRequest,
{
    rejectValue: Error
}
>("comment/downvoteComment", async (voteData, thunkAPI) => {
    try {
        const commentId: string = voteData.commentId as string
        await axiosInstance.post(`api/comments/downvote/${commentId}`, {flag: voteData.flag});
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