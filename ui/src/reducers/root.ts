import auth from 'reducers/auth';
import items from 'reducers/items';
import tags from 'reducers/tags';
import { combineReducers } from 'redux';

export default combineReducers({
  items,
  tags,
  auth
});