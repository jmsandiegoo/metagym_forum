import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../types";
import { createThread } from "./threadThunks";

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
    }
})

export default threadSlice.reducer