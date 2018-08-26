import asyncChain from 'actions/asyncChain';
import itemAPI from 'api/items';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetItemPayload, GetItemsPayload, IPayloadAction, IRootState } from 'types';

// ITEM
export const FETCH_ITEM_LOADING = 'FETCH_ITEM_LOADING';
export type FETCH_ITEM_LOADING_TYPE = typeof FETCH_ITEM_LOADING;
interface ILoadingItemAction extends Action {
  readonly type: FETCH_ITEM_LOADING_TYPE;
}

export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export type FETCH_ITEM_SUCCESS_TYPE = typeof FETCH_ITEM_SUCCESS;
interface IGetItemAction extends IPayloadAction<GetItemPayload> {
  readonly type: FETCH_ITEM_SUCCESS_TYPE;
  payload: GetItemPayload;
}

export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';
export type FETCH_ITEM_ERROR_TYPE = typeof FETCH_ITEM_ERROR;
interface IErrorItemAction extends Action {
  readonly type: FETCH_ITEM_ERROR_TYPE;
}

export const FETCH_ITEM_COMPLETE = 'FETCH_ITEM_COMPLETE';
export type FETCH_ITEM_COMPLETE_TYPE = typeof FETCH_ITEM_COMPLETE;
interface ICompleteItemAction extends Action {
  readonly type: FETCH_ITEM_COMPLETE_TYPE;
}

// ITEMS
export const FETCH_ITEMS_LOADING = 'FETCH_ITEMS_LOADING';
export type FETCH_ITEMS_LOADING_TYPE = typeof FETCH_ITEMS_LOADING;
interface ILoadingItemsAction extends Action {
  readonly type: FETCH_ITEMS_LOADING_TYPE;
}

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export type FETCH_ITEMS_SUCCESS_TYPE = typeof FETCH_ITEMS_SUCCESS;
interface IGetItemsAction extends IPayloadAction<GetItemsPayload> {
  readonly type: FETCH_ITEMS_SUCCESS_TYPE;
  payload: GetItemsPayload;
}

export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
export type FETCH_ITEMS_ERROR_TYPE = typeof FETCH_ITEMS_ERROR;
interface IErrorItemsAction extends Action {
  readonly type: FETCH_ITEMS_ERROR_TYPE;
}

export const FETCH_ITEMS_COMPLETE = 'FETCH_ITEMS_COMPLETE';
export type FETCH_ITEMS_COMPLETE_TYPE = typeof FETCH_ITEMS_COMPLETE;
interface ICompleteItemsAction extends Action {
  readonly type: FETCH_ITEMS_COMPLETE_TYPE;
}

export type ItemAction = ILoadingItemsAction
  | IGetItemsAction
  | IErrorItemsAction
  | ICompleteItemsAction
  | ILoadingItemAction
  | IGetItemAction
  | IErrorItemAction
  | ICompleteItemAction;

export const fetchItem: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (itemId: number) => {
    return asyncChain(itemAPI.get, {
      loading: FETCH_ITEM_LOADING,
      success: FETCH_ITEM_SUCCESS,
      error: FETCH_ITEM_ERROR,
      complete: FETCH_ITEM_COMPLETE
    }, itemId);
  };

export const fetchItems: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return asyncChain(itemAPI.getAll, {
      loading: FETCH_ITEMS_LOADING,
      success: FETCH_ITEMS_SUCCESS,
      error: FETCH_ITEMS_ERROR,
      complete: FETCH_ITEMS_COMPLETE
    });
  };
