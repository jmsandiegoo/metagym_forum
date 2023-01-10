import { createSlice } from "@reduxjs/toolkit";
import User from "../types/User";
import { signup, login, signOut, fetchAuthUser } from "./authThunks";

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
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.loading = false;
            state.token = null;
            state.authUser = null;
        })
        builder.addCase(fetchAuthUser.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.user);
            state.token = action.payload.jwt;
            state.authUser = action.payload.user;
        })
        builder.addCase(fetchAuthUser.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export default authSlice.reducer