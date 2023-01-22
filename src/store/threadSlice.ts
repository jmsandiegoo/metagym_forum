import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../types";
import { createThread, deleteThread, fetchThread, searchThread, updateThread } from "./threadThunks";

interface StateType {
    threads: Thread[];
    currentThread: Thread | null;
    loading: boolean;
}

const initialState: StateType = {
    threads: [],
    currentThread: null,
    loading: false,
}

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createThread.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread;
        })
        builder.addCase(createThread.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(fetchThread.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread
        })
        builder.addCase(fetchThread.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateThread.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(updateThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread
        })
        builder.addCase(updateThread.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(searchThread.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(searchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.threads = action.payload.result;
        })
        builder.addCase(searchThread.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThread.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteThread.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThread.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default threadSlice.reducer;