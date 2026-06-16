import api from "../../../api/axios";
import {
    LIKE_POST,
    UNLIKE_POST
} from "../../../constants/apiendPoints";

// LIKE
export const likePost = async (postId) => {
    const res = await api.post(`${LIKE_POST}/${postId}`);
    return res.data;
};

// UNLIKE
export const unlikePost = async (postId) => {
    const res = await api.delete(`${UNLIKE_POST}/${postId}`);
    return res.data;
};

// GET LIKES (IMPORTANT FIXED PATH)
export const getLikesByPost = async (postId) => {
    const res = await api.get(`${LIKE_POST}/${postId}`);
    return res.data;
};