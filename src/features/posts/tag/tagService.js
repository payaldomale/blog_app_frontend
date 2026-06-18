import api from "../../../api/axios";
import {
    CREATE_TAG,
    ATTACH_TAG,
    GET_POSTS_BY_TAG,
    GET_TAGS_BY_POST,
} from "../../../constants/apiEndpoints";

// get tags of a post
export const getTagsByPost = async (postId) => {
    const { data } = await api.get(
        GET_TAGS_BY_POST(postId)
    );
    return data;
};

// get posts by tag
export const getPostsByTag = async (tagId) => {
    const { data } = await api.get(
        GET_POSTS_BY_TAG(tagId)
    );
    return data;
};

// attach tag to post
export const attachTag = async (payload) => {
    const { data } = await api.post(
        ATTACH_TAG,
        payload
    );
    return data;
};

// create tag (optional)
export const createTag = async (name) => {
    const { data } = await api.post(
        CREATE_TAG,
        { name }
    );
    return data;
};
