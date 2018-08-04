import {
  GET_TAGS,
  ItemAction,
  LOADING_TAGS
} from 'actions/tags';
import { ITagsState } from 'types';

const initialState = {
  error: false,
  tags: [],
  loadingTags: false
};

export default (state: ITagsState = initialState, action: ItemAction) => {
  switch (action.type) {
    case LOADING_TAGS:
      return {
        ...state,
        loadingTags: true
      };
    case GET_TAGS:
      return {
        ...state,
        tags: action.payload,
        loadingTags: false
      };
    default:
      return state;
  }
};