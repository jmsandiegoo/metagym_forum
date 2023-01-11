import { createSlice } from "@reduxjs/toolkit";
import { Interest } from "../types";
import { fetchInterests } from "./interestThunk";

interface StateType {
    interests: Interest[];
    loading: boolean;
}

const initialState: StateType = {
    interests: [],
    loading: false,
}

const interestSlice = createSlice({
    name: 'interest',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInterests.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchInterests.fulfilled, (state, action) => {
            state.loading = false;
            state.interests = action.payload.interests;
        })
    }
})

export default interestSlice.reducer