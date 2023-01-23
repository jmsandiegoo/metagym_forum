import { createSlice } from "@reduxjs/toolkit";
import { Error, Thread } from "../types";
import { createThread, deleteThread, fetchThread, searchThread, updateThread } from "./threadThunks";

interface StateType {
    threads: Thread[];
    currentThread: Thread | null;
    loading: boolean;
    error: Error | null;
}

const initialState: StateType = {
    threads: [],
    currentThread: null,
    loading: false,
    error: null,
}

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(createThread.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(createThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread;
        })
        builder.addCase(createThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(fetchThread.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread
        })
        builder.addCase(fetchThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(updateThread.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(updateThread.fulfilled, (state, action) => {
            state.loading = false;
            state.currentThread = action.payload.thread
        })
        builder.addCase(updateThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(searchThread.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(searchThread.fulfilled, (state, action) => {
            state.loading = false;
            state.threads = action.payload.result;
        })
        builder.addCase(searchThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(deleteThread.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(deleteThread.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteThread.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
    }
})

export default threadSlice.reducer;