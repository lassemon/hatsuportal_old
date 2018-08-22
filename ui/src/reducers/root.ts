import auth from 'reducers/auth';
import error from 'reducers/error';
import items from 'reducers/items';
import tags from 'reducers/tags';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  tags,
  auth,
  error
});