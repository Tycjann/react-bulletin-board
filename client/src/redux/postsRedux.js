import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getRequest = ({ posts }) => posts.request;
export const getPosts = ({ posts }) => posts.data;
export const getPostById = ({ posts }, id) => posts.data.find((post) => post._id === id);

/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_POSTS = createActionName('LOAD_POSTS');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const REMOVE_POST = createActionName('REMOVE_POST');

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadPosts = (payload) => ({ payload, type: LOAD_POSTS });
export const addPost = (payload) => ({ type: ADD_POST, payload });
export const editPost = (payload) => ({ type: EDIT_POST, payload });
export const removePost = (payload) => ({ type: REMOVE_POST, payload });

/* THUNKS */

export const loadPostsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'LOAD_POSTS' }));
    try {
      let res = await axios.get(`${API_URL}/posts`);
      dispatch(loadPosts(res.data));
      dispatch(endRequest({ name: 'LOAD_POSTS' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_POSTS', error: e.message}));
    }

    // console.log('Loading...');
  };
};

export const addPostRequest = (post) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'ADD_POST' }));
    try {
      let res = await axios.post(`${API_URL}/posts`, post);
      dispatch(addPost(res));
      dispatch(endRequest({ name: 'ADD_POST' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_POST', error: e.message }));
    }
  };
};

export const editPostRequest = (post, id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'EDIT_POST1' }));
    try {
      let res = await axios.put(`${API_URL}/posts/${id}`, post);
      dispatch(editPost(res));
      dispatch(endRequest({ name: 'EDIT_POST2' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'EDIT_POST3', error: e.message }));
    }
  };
};

export const removePostRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: 'REMOVE_POST' }));
    try {
      let res = await axios.delete(`${API_URL}/posts/${id}`);
      dispatch(removePost(res));
      dispatch(endRequest({ name: 'REMOVE_POST' }));
    } catch (e) {
      dispatch(errorRequest({ name: 'REMOVE_POST', error: e.message }));
    }
  };
};


/* INITIAL STATE */

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */

const postsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };

    case LOAD_POSTS:
      return { ...statePart, data: [...action.payload] };
    case ADD_POST:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_POST:
      return {
        ...statePart,
        data: statePart.data.map((post) =>
          post._id === action.payload.id ? { ...post, ...action.payload } : post
        ),
      };
    case REMOVE_POST:
      return {
        ...statePart,
        data: statePart.data.filter((post) => post._id !== action.payload),
      };
    default:
      return statePart;
  }
};

export default postsReducer;
