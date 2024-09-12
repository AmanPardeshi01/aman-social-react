import axios from 'axios';
import { api, API_BASE_URL } from '../../config/api';
import {
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SEARCH_USER_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS
} from './auth.actionType';

// Login User Action
export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);

        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }
        console.log('Login success:', data);
        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log('Login error:', error);
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};

// Register User Action
export const registerUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, loginData.data);

        if (data.token) {
            localStorage.setItem('jwt', data.token);
        }
        console.log('Registration success:', data);
        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    } catch (error) {
        console.log('Registration error:', error);
        dispatch({ type: REGISTER_FAILURE, payload: error });
    }
};

// Get Profile Action
export const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(
            `${API_BASE_URL}/api/users/profile`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        console.log('Profile data:', data);
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log('Get profile error:', error);
        dispatch({ type: GET_PROFILE_FAILURE, payload: error.message || 'Failed to fetch profile' });
    }
};

// Update Profile Action
export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    try {
        const { data } = await api.put(
            `${API_BASE_URL}/api/users`,
            reqData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`, // Assuming JWT is needed for authentication
                },
            }
        );

        console.log('Update profile success:', data);
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        console.log('Update profile error:', error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message || 'Failed to update profile' });
    }
};

// Get User
export const searchUser = (query) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_REQUEST });
    try {
        const { data } = await api.get(`/api/users/search?query=${query}`);

        console.log('saerch User:', data);
        dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
    } catch (error) {
        console.log('Get profile error:', error);
        dispatch({ type: SEARCH_USER_FAILURE, payload: error.message || 'Failed to fetch profile' });
    }
};
