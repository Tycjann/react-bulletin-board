import { nanoid } from 'nanoid';
import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllPublishedPosts = ({ posts }) => posts.data;
export const getRequest = ({ posts }) => posts.request;

export const getSinglePostById = ({ posts }, postId) => posts.find((post) => post.id === postId);
// export const getOnlyPublishedPost = ({ posts }) => {
//   return posts.filter((post) => post.statusId === '2');
// };
// export const getAllPostByCategoryId = ({ posts }, category) => {
//   if (!category) return posts;
//   return posts.filter((post) => post.categoryId === category.id);
// };

/* ACTIONS */

// action name creator
const reducerName = 'concerts';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_PUBLISHED_POSTS = createActionName('LOAD_PUBLISHED_POSTS');

const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const REMOVE_POST = createActionName('REMOVE_POST');

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadPublishedPosts = (payload) => ({ payload, type: LOAD_PUBLISHED_POSTS });

export const addPost = (payload) => ({ type: ADD_POST, payload });
export const editPost = (payload) => ({ type: EDIT_POST, payload });
export const removePost = (payload) => ({ type: REMOVE_POST, payload });

/* THUNKS */

export const loadPublishedPostsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/posts`);
      // console.log('dat:', res.data);
      dispatch(loadPublishedPosts(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
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
    case LOAD_PUBLISHED_POSTS:
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };

    case ADD_POST:
      return [...statePart, { ...action.payload, id: nanoid() }];
    case EDIT_POST:
      return statePart.map((post) =>
        post.id === action.payload.id ? { ...post, ...action.payload } : post
      );
    case REMOVE_POST:
      return statePart.filter((post) => post.id !== action.payload);
    default:
      return statePart;
  }
};

export default postsReducer;
