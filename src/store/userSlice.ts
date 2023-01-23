import { createSlice } from "@reduxjs/toolkit";
import { User, Error } from "../types";
import { fetchUser } from "./userThunks";

interface StateType {
    loading: boolean;
    user: User | null;
    error: Error | null;
}

const initialState: StateType = {
    loading: false,
    user: null,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error
        })
    }
})

export default userSlice.reducer