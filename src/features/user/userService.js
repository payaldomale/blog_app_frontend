import api from "../../api/axios";
import {
    GET_USER_PROFILE,
    UPDATE_USER_PROFILE,
    DELETE_USER
} from "../../constants/apiEndpoints";

// GET PROFILE
export const getUserProfile = async (id) => {
    const res = await api.get(`${GET_USER_PROFILE}?id=${id}`);
    return res.data;
};

// UPDATE PROFILE
export const updateUserProfile = async (id, data) => {
    const res = await api.put(`${UPDATE_USER_PROFILE}/${id}`, data);
    return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
    const res = await api.put(`${DELETE_USER}/${id}`);
    return res.data;
};