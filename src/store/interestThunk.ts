import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Error, InterestsResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";
import { setErrorFeedback } from "./feedbackSlice";

export const fetchInterests = createAsyncThunk<
InterestsResponse,
void,
{
    rejectValue: Error
}
>("interest/fetchInterests", async (_, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<InterestsResponse>("api/interests/");
        return data;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: "[Interests]:" + (error.response?.data?.error as string || error.message)
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "[Interests]: An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})
