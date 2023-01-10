import axios, { AxiosHeaders } from "axios"
import { CompletionTriggerKind } from "typescript";
import { getToken } from "./localStorageHelper";

const config = {
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json"
    }
}

export const axiosInstance = axios.create(config)