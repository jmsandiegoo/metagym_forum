import { createSlice } from "@reduxjs/toolkit";
import { createThreadComment, deleteThreadComment, fetchThreadComments } from "./commentThunks";
import { Comment } from "../types";

interface StateType {
    comments: Comment[];
    loading: boolean;
}

const initialState: StateType = {
    comments: [],
    loading: false,
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreadComments.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchThreadComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload.comments;
        })
        builder.addCase(fetchThreadComments.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(createThreadComment.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(createThreadComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = [action.payload.comment, ...state.comments];
        })
        builder.addCase(createThreadComment.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThreadComment.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteThreadComment.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThreadComment.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default commentSlice.reducer;