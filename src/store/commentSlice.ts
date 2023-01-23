import { createSlice } from "@reduxjs/toolkit";
import { createThreadComment, deleteThreadComment, fetchThreadComments, updateThreadComment } from "./commentThunks";
import { Error, Comment } from "../types";

interface StateType {
    comments: Comment[];
    loading: boolean;
    error: Error | null;
}

const initialState: StateType = {
    comments: [],
    loading: false,
    error: null
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreadComments.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchThreadComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
        })
        builder.addCase(fetchThreadComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(createThreadComment.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createThreadComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = [action.payload.comment, ...state.comments];
        })
        builder.addCase(createThreadComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(updateThreadComment.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateThreadComment.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateThreadComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(deleteThreadComment.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteThreadComment.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThreadComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
    }
})

export default commentSlice.reducer;