import axios from "axios"
import { useWebStore } from "../store/authStore"

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use(config => {
    const { token } = useWebStore.getState()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})