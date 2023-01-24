import axios, { AxiosHeaders } from "axios"
import { CompletionTriggerKind } from "typescript";
import { getToken } from "./localStorageHelper";

const config = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        "Content-type": "application/json"
    }
}

export const axiosInstance = axios.create(config)