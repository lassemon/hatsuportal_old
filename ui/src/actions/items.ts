import asyncChain from 'actions/asyncChain';
import itemAPI from 'api/items';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetItemsPayload, IPayloadAction, IRootState } from 'types';

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
  | ICompleteItemsAction;

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
