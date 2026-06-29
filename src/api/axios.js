import axios from "axios";
import { useAuth } from "../store/authStore";

const api = axios.create({
    // baseURL: `${import.meta.env.VITE_APP_API_PATH}/api`,
    baseURL: `${import.meta.env.VITE_APP_API_PATH}`,
    timeout: 30000,
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = useAuth.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }
        // console.log("TOKEN IN REQUEST:", useAuth.getState().token);
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

