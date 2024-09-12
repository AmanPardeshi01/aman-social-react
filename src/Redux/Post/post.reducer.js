import {
    CREATE_COMMENT_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    GET_ALL_POST_FAILURE,
    GET_ALL_POST_REQUEST,
    GET_ALL_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS
} from "./post.action.type";

const initialState = {
    post: null,         // Holds the single post being created
    loading: false,     // Indicates if a request is in progress
    error: null,        // Holds error messages
    posts: [],          // Holds all posts
    like: null,          // Holds the liked post data
    comments: [],
    newComment: null
};

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
            return { ...state, error: null, loading: true };

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts], // Add the new post to the posts array
                loading: false,
                error: null
            };

        case GET_ALL_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload, // Replace posts with fetched posts
                comments: action.payload.comments,
                loading: false,
                error: null
            };

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) =>
                    item.id === action.payload.id ? action.payload : item // Update the liked post
                ),
                loading: false,
                error: null
            }
        case CREATE_COMMENT_SUCCESS:
            return { ...state, newComment: action.payload, loading: false, error: null }

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
};
