import { createSlice } from "@reduxjs/toolkit";
import { Error, Interest } from "../types";
import { fetchInterests } from "./interestThunk";

interface StateType {
    interests: Interest[];
    loading: boolean;
    error: Error | null;
}

const initialState: StateType = {
    interests: [],
    loading: false,
    error: null,
}

const interestSlice = createSlice({
    name: 'interest',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInterests.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchInterests.fulfilled, (state, action) => {
            state.loading = false;
            state.interests = action.payload.interests;
        })
        builder.addCase(fetchInterests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
    }
})

export default interestSlice.reducer