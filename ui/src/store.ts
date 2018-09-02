import createHistory from 'history/createBrowserHistory';
import { tokenMiddleware, userMiddleware } from 'middleware';
import { Store } from 'react-redux';
import rootReducer from 'reducers/root';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { IRootState } from 'types';
import { loadUser } from 'utils/localStorage';

export const history = createHistory();

const persistedState = {
  auth: {
    ...loadUser()
  }
};

const middleware = [
  thunk,
  userMiddleware,
  tokenMiddleware
];

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware)
);

const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers
);

// observeStore(store, saveUser);

export default store as Store<IRootState>;