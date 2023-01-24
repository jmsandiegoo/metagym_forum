import { createSlice } from "@reduxjs/toolkit";
import { Error, User } from "../types";
import { signup, login, signOut, fetchAuthUser, onboard } from "./authThunks";

interface StateType {
    token: string | null;
    loading: boolean;
    authUser: User | null;
    error: Error | null;
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
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(signup.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.loading = false;
            state.token = null;
            state.authUser = null;
        })
        builder.addCase(onboard.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(onboard.fulfilled, (state, action) => {
            state.loading = false;
            if (state.authUser) {
                state.authUser.profile = action.payload.profile; 
            }
        })
        builder.addCase(onboard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
        builder.addCase(fetchAuthUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as Error;
        })
    }
})

export default authSlice.reducer