import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/root';

export const history = createHistory();

const initialState = {};
const middleware = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = compose(
  applyMiddleware(...middleware)
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;