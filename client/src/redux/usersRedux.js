import { nanoid } from 'nanoid';

// selectors
export const getAllUsers = ({ users }) => users;

export const getUserById = ({ users }, userId) =>
  users.find((user) => user.id === userId);

// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const ADD_USER = createActionName('ADD_USER');
const EDIT_USER = createActionName('EDIT_USER');
const REMOVE_USER = createActionName('REMOVE_USER');

// action creators
export const addUser = (payload) => ({ type: ADD_USER, payload });
export const editUser = (payload) => ({ type: EDIT_USER, payload });
export const removeUser = (payload) => ({ type: REMOVE_USER, payload });

const usersReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [...statePart, { ...action.payload, id: nanoid() }];
    case EDIT_USER:
      return statePart.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    case REMOVE_USER:
      return statePart.filter((user) => user.id !== action.payload);
    default:
      return statePart;
  }
};

export default usersReducer;