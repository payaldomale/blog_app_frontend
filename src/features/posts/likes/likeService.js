import api from "../../../api/axios";
import {
    LIKE_POST,
    UNLIKE_POST,
    LIKE_STATUS
} from "../../../constants/apiEndpoints";

export const likePost = async (postId) => {
    const res = await api.post(
        LIKE_POST(postId)
    );

    return res.data;
};

export const unlikePost = async (postId) => {
    const res = await api.delete(
        UNLIKE_POST(postId)
    );

    return res.data;
};

export const getLikeStatus = async (postId) => {
    const res = await api.get(
        LIKE_STATUS(postId)
    );

    return res.data;
};