import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import posts from './postsRedux';
import statuses from './statusesRedux';
import users from './usersRedux';

// combine reducers
const rootReducer = combineReducers({
  posts,
  statuses,
  users,
});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
