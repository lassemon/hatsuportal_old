import {
  FETCH_ITEM_COMPLETE,
  FETCH_ITEM_ERROR,
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEMS_COMPLETE,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_LOADING,
  FETCH_ITEMS_SUCCESS,
  ItemAction
} from 'actions/items';
import { IItemsState } from 'types';

const initialState = {
  loadingItems: false,
  loadingItem: false,
  items: [],
  item: undefined,
  itemsError: false,
  itemError: false
};

export default (state: IItemsState = initialState, action: ItemAction) => {
  switch (action.type) {
    case FETCH_ITEM_LOADING:
      return {
        ...state,
        itemError: false,
        loadingItem: true
      };
    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload
      };
    case FETCH_ITEM_ERROR:
      return {
        ...state,
        itemError: true
      };
    case FETCH_ITEM_COMPLETE:
      return {
        ...state,
        loadingItem: false
      };
    case FETCH_ITEMS_LOADING:
      return {
        ...state,
        itemsError: false,
        loadingItems: true
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload
      };
    case FETCH_ITEMS_ERROR:
      return {
        ...state,
        itemsError: true
      };
    case FETCH_ITEMS_COMPLETE:
      return {
        ...state,
        loadingItems: false
      };
    default:
      return state;
  }
};