import {
  FETCH_TAGS_COMPLETE,
  FETCH_TAGS_ERROR,
  FETCH_TAGS_LOADING,
  FETCH_TAGS_SUCCESS,
  TagAction
} from 'actions/tags';
import { ITagsState } from 'types';

const initialState = {
  error: false,
  tags: [],
  loading: false
};

export default (state: ITagsState = initialState, action: TagAction) => {
  switch (action.type) {
    case FETCH_TAGS_LOADING:
      return {
        ...state,
        error: false,
        loading: true
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        tags: action.payload
      };
    case FETCH_TAGS_ERROR:
      return {
        ...state,
        error: true
      };
    case FETCH_TAGS_COMPLETE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};