import axios from "axios";

const BASE_URL="https://chat-app-1-vrhe.onrender.com/api/v1"

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})