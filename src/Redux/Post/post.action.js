import { api } from '../../config/api';
import {
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    GET_ALL_POST_FAILURE,
    GET_ALL_POST_REQUEST,
    GET_ALL_POST_SUCCESS,
    GET_USERS_POST_FAILURE,
    GET_USERS_POST_REQUEST,
    GET_USERS_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS
} from './post.action.type';

// Action creator for creating a post
export const createPostAction = (postData) => async (dispatch) => {
    dispatch({ type: CREATE_POST_REQUEST });
    try {
        const { data } = await api.post('/api/posts', postData);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
        console.log("Created Post:", data);
    } catch (error) {
        console.error("Create Post Error:", error);
        dispatch({ type: CREATE_POST_FAILURE, payload: error.message || 'An error occurred while creating the post' });
    }
};

// Action creator for fetching all posts
export const getAllPostAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST });
    try {
        const { data } = await api.get('/api/posts');
        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data });
        console.log("Get All Posts:", data);
    } catch (error) {
        console.error("Get All Posts Error:", error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error.message || 'An error occurred while fetching posts' });
    }
};

// Action creator for fetching posts by user
export const getUsersPostAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST });
    try {
        const { data } = await api.get(`/api/posts/user/${userId}`);
        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data });
        console.log("Get User's Posts:", data);
    } catch (error) {
        console.error("Get User's Posts Error:", error);
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error.message || 'An error occurred while fetching user posts' });
    }
};

// Action creator for liking a post
export const likePostAction = (postId) => async (dispatch) => {
    dispatch({ type: LIKE_POST_REQUEST });
    try {
        const { data } = await api.put(`/api/posts/like/${postId}`); // Ensure this is the correct endpoint
        dispatch({ type: LIKE_POST_SUCCESS, payload: data });
        console.log("Like Post:", data);
    } catch (error) {
        console.error("Like Post Error:", error);
        dispatch({ type: LIKE_POST_FAILURE, payload: error.message || 'An error occurred while liking the post' });
    }
};

// Action creator for creating a comment
export const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
        const { data } = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data);
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
        console.log("Created Comment:", data);
    } catch (error) {
        console.error("Create Post Error:", error);
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error.message || 'An error occurred while creating the comment' });
    }
};
