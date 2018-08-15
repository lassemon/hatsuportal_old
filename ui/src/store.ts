import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadUser, saveUser } from 'utils/localStorage';
import { observeStore } from 'utils/store';
import rootReducer from './reducers/root';

export const history = createHistory();

const persistedState = {
  auth: {
    ...loadUser()
  }
};

const middleware = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware)
);

const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
);

observeStore(store, saveUser);

export default store;