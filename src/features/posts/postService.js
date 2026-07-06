import api from "../../api/axios";
import {
    CREATE_POST,
    GET_ALL_POSTS,
    GET_POST_BY_ID,
    UPDATE_POST,
    DELETE_POST,
    GET_POSTS_BY_USER,
    PUBLISH_POST,
    GET_PUBLISHED_POSTS,
    GENERATE_TITLE,
    GENERATE_SUMMARY,
    GENERATE_TAGS,
    IMPROVE_WRITING,
    FIX_GRAMMAR,
    SEARCH_POSTS,
} from "../../constants/apiEndpoints";

// Create Post
export const createPost = async (postData) => {
    const res = await api.post(CREATE_POST, postData);
    return res.data;
};

// Get all posts
export const getAllPosts = async () => {
    const res = await api.get(GET_ALL_POSTS);
    return res.data;
};

// Get published posts
export const getPublishedPosts = async () => {
    const res = await api.get(GET_PUBLISHED_POSTS);
    // console.log(res.data)
    return res.data;
};

// Get post by ID
export const getPostById = async (id) => {
    const res = await api.get(`${GET_POST_BY_ID}/${id}`);
    return res.data;
};

// Update post
export const updatePost = async ({ id, postData }) => {
    const res = await api.put(`${UPDATE_POST}/${id}`, postData);
    return res.data;
};

// Delete post
// export const deletePost = async (id) => {
//     const res = await api.put(`${DELETE_POST}/${id}`);
//     return res.data;
// };

export const deletePost = async (id) => {
    const res = await api.delete(`${DELETE_POST}/${id}`);
    return res.data;
};

// Get posts by user
export const getPostsByUser = async (id) => {
    const res = await api.get(`${GET_POSTS_BY_USER}/${id}`);
    return res.data;
};

// Publish post
export const publishPost = async (id) => {
    const res = await api.put(`${PUBLISH_POST}/${id}`);
    return res.data;
};

// AI - Generate Titles
export const generateTitles = async (content) => {
    const res = await api.post(GENERATE_TITLE, {
        content,
    });

    return res.data;
};

// AI - Generate Summary
export const generateSummary = async (content) => {
    const res = await api.post(GENERATE_SUMMARY, {
        content,
    });

    return res.data;
};

// AI - Generate Tags
export const generateTags = async (content) => {
    const res = await api.post(GENERATE_TAGS, {
        content,
    });

    return res.data;
};

// AI - Improve Writing
export const improveWriting = async (content) => {
    const res = await api.post(IMPROVE_WRITING, {
        content,
    });

    return res.data;
};

// AI - Grammar Fix
export const fixGrammar = async (content) => {
    const res = await api.post(FIX_GRAMMAR, {
        content,
    });

    return res.data;
};

// Search Posts
export const searchPosts = async (query) => {
    const res = await api.get(SEARCH_POSTS, {
        params: {
            q: query,
        },
    });

    return res.data;
};
