import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { InterestsResponse } from "../types";
import { axiosInstance } from "../utilities/httpCommon";

export const fetchInterests = createAsyncThunk("interest/fetchInterests", async (_, thunkAPI) => {
    try {
        const {data} = await axiosInstance.get<InterestsResponse>("api/interests/");
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message);
        } else {
            console.log('unexpected error: ', error);
            console.error(error)
            return thunkAPI.rejectWithValue('An unexpected error occurred');
        }
    }
})
