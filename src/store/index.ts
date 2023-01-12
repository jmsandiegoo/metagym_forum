import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import interestReducer from "./interestSlice";
import threadReducer from "./threadSlice";
import feedbackReducer from "./feedbackSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        interest: interestReducer,
        thread: threadReducer,
        feedback: feedbackReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch