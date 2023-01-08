import { createSlice } from "@reduxjs/toolkit";
import UserProfile from "../types/UserProfile";
import { signup } from "./authThunks";

interface StateType {
    token: string | null;
    loading: boolean;
    authUser: UserProfile | null;
    error: string | null;
}

const initialState: StateType = {
    token: null,
    loading: false,
    authUser: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
            state.error = null;
        })
    }
})

export default authSlice.reducer