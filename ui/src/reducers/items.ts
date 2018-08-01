import {
  GET_ITEMS,
  ItemAction,
  LOADING_ITEMS
} from 'actions/items';
import { IItemsState } from 'types';

const initialState = {
  error: false,
  items: [],
  loadingItems: false,
};

export default (state: IItemsState = initialState, action: ItemAction) => {
  switch (action.type) {
    case LOADING_ITEMS:
      return {
        ...state,
        loadingItems: true
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loadingItems: false
      };
    default:
      return state;
  }
};