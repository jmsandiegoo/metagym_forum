import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackData, Thread } from "../types";

interface StateType {
    // showFeedback: boolean,
    feedbackData: FeedbackData | null
}

const initialState: StateType = {
    feedbackData: null
}

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setSuccessFeedback: (state, action: PayloadAction<string>) => {
            const feedback: FeedbackData = {
                type: "success",
                message: action.payload
            }
            state.feedbackData = feedback;
        },
        setErrorFeedback: (state, action: PayloadAction<string>) => {
            const feedback: FeedbackData = {
                type: "error",
                message: action.payload
            }
            state.feedbackData = feedback;
        }
    }
})

export const { setSuccessFeedback, setErrorFeedback } = feedbackSlice.actions

export default feedbackSlice.reducer