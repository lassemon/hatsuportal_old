import {
  DELETE_ITEM_COMPLETE,
  DELETE_ITEM_ERROR,
  DELETE_ITEM_LOADING,
  DELETE_ITEM_SUCCESS,
  FETCH_ITEM_COMPLETE,
  FETCH_ITEM_ERROR,
  FETCH_ITEM_LOADING,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEMS_COMPLETE,
  FETCH_ITEMS_ERROR,
  FETCH_ITEMS_LOADING,
  FETCH_ITEMS_SUCCESS,
  INSERT_ITEM_COMPLETE,
  INSERT_ITEM_ERROR,
  INSERT_ITEM_LOADING,
  INSERT_ITEM_SUCCESS,
  ItemAction,
  TOGGLE_EDIT_ITEM,
  UPDATE_ITEM_COMPLETE,
  UPDATE_ITEM_ERROR,
  UPDATE_ITEM_LOADING,
  UPDATE_ITEM_SUCCESS
} from 'actions/items';
import { IItemsState } from 'types';

const initialState = {
  loadingItems: false,
  loadingItem: false,
  loadingItemInsert: false,
  loadingItemUpdate: false,
  loadingItemDelete: false,
  items: [],
  item: undefined,
  itemsError: false,
  itemError: false,
  itemInsertError: false,
  itemUpdateError: false,
  itemDeleteError: false,
  editingItem: false,
  loggedIn: false
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
    case TOGGLE_EDIT_ITEM:
      return {
        ...state,
        editingItem: action.payload,
        itemUpdateError: action.payload ? state.itemUpdateError : false
      };
    case INSERT_ITEM_LOADING:
      return {
        ...state,
        itemInsertError: false,
        loadingItemInsert: true
      };
    case INSERT_ITEM_SUCCESS:
      const newItems = state.items;
      newItems.push(action.payload);
      return {
        ...state,
        item: action.payload,
        items: newItems
      };
    case INSERT_ITEM_ERROR:
      return {
        ...state,
        itemInsertError: true
      };
    case INSERT_ITEM_COMPLETE:
      return {
        ...state,
        loadingItemInsert: false
      };
    case UPDATE_ITEM_LOADING:
      return {
        ...state,
        itemUpdateError: false,
        loadingItemUpdate: true
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        editingItem: false
      };
    case UPDATE_ITEM_ERROR:
      return {
        ...state,
        itemUpdateError: true
      };
    case UPDATE_ITEM_COMPLETE:
      return {
        ...state,
        loadingItemUpdate: false
      };

    case DELETE_ITEM_LOADING:
      return {
        ...state,
        itemDeleteError: false,
        loadingItemDelete: true
      };
    case DELETE_ITEM_SUCCESS:
      const cleanedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: cleanedItems
      };
    case DELETE_ITEM_ERROR:
      return {
        ...state,
        itemDeleteError: true
      };
    case DELETE_ITEM_COMPLETE:
      return {
        ...state,
        loadingItemDelete: false
      };
    default:
      return state;
  }
};