import api from "../../api/axios";
import { LOGIN, REGISTER } from "../../constants/apiEndpoints";

export const loginUser = async (credentials) => {
    try {
        const res = await api.post(LOGIN, credentials);
        return res.data;
    } catch (error) {
        throw error?.response?.data || { message: "Login failed" };
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await api.post(REGISTER, userData);
        return res.data;
    } catch (error) {
        throw error?.response?.data || { message: "Signup failed" };
    }
};
