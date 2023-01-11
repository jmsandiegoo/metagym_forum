import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import interestReducer from "./interestSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        interest: interestReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch