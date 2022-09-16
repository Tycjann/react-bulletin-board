import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getRequest = ({ statuses }) => statuses.request;
export const getStatuses = ({ statuses }) => statuses.data;
export const getStatusById = ({ statuses }, id) => statuses.data.find((status) => status._id === id);

/* ACTIONS */

// action name creator
const reducerName = 'statuses';
const createActionName = (actionName) => `app/${reducerName}/${actionName}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_STATUSES = createActionName('LOAD_STATUSES');

// action creators
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadStatuses = (payload) => ({ payload, type: LOAD_STATUSES });

/* THUNKS */

export const loadStatusesRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}/statuses`);
      dispatch(loadStatuses(res.data));
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
    case START_REQUEST:
      return { ...statePart, request: { pending: true, error: null, success: false } };
    case END_REQUEST:
      return { ...statePart, request: { pending: false, error: null, success: true } };
    case ERROR_REQUEST:
      return { ...statePart, request: { pending: false, error: action.error, success: false } };

    case LOAD_STATUSES:
      return { ...statePart, data: [...action.payload] };
    default:
      return statePart;
  }
};

export default postsReducer;
