import { createSlice } from "@reduxjs/toolkit";
import User from "../types/User";
import { signup, login } from "./authThunks";

interface StateType {
    token: string | null;
    loading: boolean;
    authUser: User | null;
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
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
            state.error = null;
        })
    }
})

export default authSlice.reducer