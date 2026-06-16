// auth
export const LOGIN = "api/auth/login";
export const REGISTER = "api/auth/signup";

// posts
export const CREATE_POST = "api/post/create";
export const GET_ALL_POSTS = "api/post/getAllPosts";
export const GET_PUBLISHED_POSTS = "api/post/published";

export const GET_POST_BY_ID = "api/post/getPostbyId";
export const UPDATE_POST = "api/post/updatePost";
export const DELETE_POST = "api/post/removePost";
export const GET_POSTS_BY_USER = "api/post/getPostsByUser";
export const PUBLISH_POST = "api/post/publish";

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
export const LIKE_POST = "api/like";
export const UNLIKE_POST = "api/unlike";
