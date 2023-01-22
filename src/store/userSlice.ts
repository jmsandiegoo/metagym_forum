import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";
import { fetchUser } from "./userThunks";

interface StateType {
    loading: boolean;
    user: User | null;
}

const initialState: StateType = {
    loading: false,
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default userSlice.reducer