import api from "../../../api/axios";

import {
    CREATE_COMMENT,
    GET_COMMENTS_BY_POST,
    UPDATE_COMMENT,
    DELETE_COMMENT
} from "../../../constants/apiEndpoints";

export const getCommentsByPost = async (
    postId
) => {
    const res = await api.get(
        `${GET_COMMENTS_BY_POST}/${postId}`
    );

    return res.data;
};

export const createComment = async (
    data
) => {
    const res = await api.post(
        CREATE_COMMENT,
        data
    );

    return res.data;
};

// UPDATE comment
export const updateComment = async ({ id, content }) => {
    const res = await api.put(`${UPDATE_COMMENT}/${id}`, {
        content,
    });
    return res.data;
};

// DELETE comment
export const deleteComment = async (id) => {
    const res = await api.put(`${DELETE_COMMENT}/${id}`);
    return res.data;
};