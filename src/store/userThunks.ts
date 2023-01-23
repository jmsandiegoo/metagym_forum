import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error, UserResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";
import axios from "axios";
import { setErrorFeedback } from "./feedbackSlice";


export const fetchUser = createAsyncThunk<
UserResponse,
string,
{
    rejectValue: Error
}
>("auth/fetcUser", async(userId, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<UserResponse>(`api/users/${userId}`);
        return data;
    } catch (error) {
        let err: Error;
        if (axios.isAxiosError(error)) {
            err = {
                status: error.response?.status,
                message: error.response?.data?.error as string || error.message
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
          } else {
            err = {
                message: "An unexpected error occured",
            }
            thunkAPI.dispatch(setErrorFeedback(err.message));
            return thunkAPI.rejectWithValue(err);
        }
    }
})