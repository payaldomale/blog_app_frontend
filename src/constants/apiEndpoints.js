// auth
export const LOGIN = "api/auth/login";
export const REGISTER = "api/auth/signup";

// posts
export const CREATE_POST = "api/post/create";
export const GET_ALL_POSTS = "api/post/getAllPosts";
export const GET_PUBLISHED_POSTS = "api/post/published";

export const GET_POST_BY_ID = "api/post/getPostById";
export const UPDATE_POST = "api/post/updatePost";
export const DELETE_POST = "api/post/removePost";
export const GET_POSTS_BY_USER = "api/post/getPostsByUser";
export const PUBLISH_POST = "api/post/publish";
export const SEARCH_POSTS = "api/post/query";

// posts-AI
export const GENERATE_TITLE = "api/ai/generate-title";
export const GENERATE_SUMMARY = "api/ai/generate-summary";
export const GENERATE_TAGS = "api/ai/generate-tags";
export const IMPROVE_WRITING = "api/ai/improve-writing";
export const FIX_GRAMMAR = "api/ai/fix-grammar";

// users
export const GET_ALL_USERS = "api/user/getAllUsers";
export const GET_USER_PROFILE = "api/user/search";
export const UPDATE_USER_PROFILE = "api/user/profile";
export const DELETE_USER = "api/user/delete";

// comments
export const CREATE_COMMENT = "api/comment/create";
export const GET_COMMENTS_BY_POST = "api/comment/post";
export const UPDATE_COMMENT = "api/comment";
export const DELETE_COMMENT = "api/delete/comment";

// likes
export const LIKE_POST = (postId) => `api/like/${postId}`;
export const UNLIKE_POST = (postId) => `api/unlike/${postId}`;
export const LIKE_STATUS = (postId) => `api/like-status/${postId}`;

// tags
export const CREATE_TAG = "api/tag/create";
export const ATTACH_TAG = "api/tag/attach";

export const GET_ALL_TAGS = "api/tag/all";

export const GET_POSTS_BY_TAG = (tagId) =>
    `api/tag/${tagId}/posts`;

export const GET_TAGS_BY_POST = (postId) =>
    `api/post/${postId}/tags`;

export const REPLACE_TAGS = "api/tag/replace";
