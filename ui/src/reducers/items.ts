import {
  FETCH_ITEMS_COMPLETE,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_LOADING,
  FETCH_ITEMS_SUCCESS,
  ItemAction
} from 'actions/items';
import { IItemsState } from 'types';

const initialState = {
  error: false,
  items: [],
  loading: false
};

export default (state: IItemsState = initialState, action: ItemAction) => {
  switch (action.type) {
    case FETCH_ITEMS_LOADING:
      return {
        ...state,
        error: false,
        loading: true
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        error: true
      };
    case FETCH_ITEMS_COMPLETE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};