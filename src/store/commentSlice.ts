import { createSlice } from "@reduxjs/toolkit";
import { createThreadComment, fetchThreadComments } from "./commentThunks";
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
            state.comments = [...state.comments, action.payload.comment];
        })
        builder.addCase(createThreadComment.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default commentSlice.reducer;