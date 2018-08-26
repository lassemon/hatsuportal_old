import auth from 'reducers/auth';
import error from 'reducers/error';
import items from 'reducers/items';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  auth,
  error
});