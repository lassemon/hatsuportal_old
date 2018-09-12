import itemAPI from 'api/items';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { DeleteItemPayload, GetItemPayload, GetItemsPayload, IItemInsertRequest, IItemUpdateRequest, InsertItemPayload, IPayloadAction, IRootState, UpdateItemPayload } from 'types';
import ActionUtil from 'utils/ActionUtil';

// ITEM
export const FETCH_ITEM_LOADING = 'FETCH_ITEM_LOADING';
export type FETCH_ITEM_LOADING_TYPE = typeof FETCH_ITEM_LOADING;
interface IFetchItemLoadingAction extends Action {
  readonly type: FETCH_ITEM_LOADING_TYPE;
}

export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export type FETCH_ITEM_SUCCESS_TYPE = typeof FETCH_ITEM_SUCCESS;
interface IFetchItemSuccessAction extends IPayloadAction<GetItemPayload> {
  readonly type: FETCH_ITEM_SUCCESS_TYPE;
  payload: GetItemPayload;
}

export const FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR';
export type FETCH_ITEM_ERROR_TYPE = typeof FETCH_ITEM_ERROR;
interface IFetchItemErrorAction extends Action {
  readonly type: FETCH_ITEM_ERROR_TYPE;
}

export const FETCH_ITEM_COMPLETE = 'FETCH_ITEM_COMPLETE';
export type FETCH_ITEM_COMPLETE_TYPE = typeof FETCH_ITEM_COMPLETE;
interface IFetchItemCompleteAction extends Action {
  readonly type: FETCH_ITEM_COMPLETE_TYPE;
}

// ITEMS
export const FETCH_ITEMS_LOADING = 'FETCH_ITEMS_LOADING';
export type FETCH_ITEMS_LOADING_TYPE = typeof FETCH_ITEMS_LOADING;
interface IFetchItemsLoadingAction extends Action {
  readonly type: FETCH_ITEMS_LOADING_TYPE;
}

export const FETCH_ITEMS_SUCCESS = 'FETCH_ITEMS_SUCCESS';
export type FETCH_ITEMS_SUCCESS_TYPE = typeof FETCH_ITEMS_SUCCESS;
interface IFetchItemsSuccessAction extends IPayloadAction<GetItemsPayload> {
  readonly type: FETCH_ITEMS_SUCCESS_TYPE;
  payload: GetItemsPayload;
}

export const FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR';
export type FETCH_ITEMS_ERROR_TYPE = typeof FETCH_ITEMS_ERROR;
interface IFetchItemsErrorAction extends Action {
  readonly type: FETCH_ITEMS_ERROR_TYPE;
}

export const FETCH_ITEMS_COMPLETE = 'FETCH_ITEMS_COMPLETE';
export type FETCH_ITEMS_COMPLETE_TYPE = typeof FETCH_ITEMS_COMPLETE;
interface IFetchItemsCompleteAction extends Action {
  readonly type: FETCH_ITEMS_COMPLETE_TYPE;
}

// ITEM EDIT/MANAGE
export const TOGGLE_EDIT_ITEM = 'TOGGLE_EDIT_ITEM';
export type TOGGLE_EDIT_ITEM_TYPE = typeof TOGGLE_EDIT_ITEM;
interface IToggleEditItemAction extends IPayloadAction<boolean> {
  readonly type: TOGGLE_EDIT_ITEM_TYPE;
  payload: boolean;
}

export const TOGGLE_MANAGE_ITEM = 'TOGGLE_MANAGE_ITEM';
export type TOGGLE_MANAGE_ITEM_TYPE = typeof TOGGLE_MANAGE_ITEM;
interface IToggleManageItemAction extends IPayloadAction<boolean> {
  readonly type: TOGGLE_MANAGE_ITEM_TYPE;
  payload: boolean;
}

export const CLEAR_FETCHED_ITEM = 'CLEAR_FETCHED_ITEM';
export type CLEAR_FETCHED_ITEM_TYPE = typeof CLEAR_FETCHED_ITEM;
interface IClearFetchedItemAction extends Action {
  readonly type: CLEAR_FETCHED_ITEM_TYPE;
}

// ITEM INSERT
export const INSERT_ITEM_LOADING = 'INSERT_ITEM_LOADING';
export type INSERT_ITEM_LOADING_TYPE = typeof INSERT_ITEM_LOADING;
interface IInsertItemLoadingAction extends Action {
  readonly type: INSERT_ITEM_LOADING_TYPE;
}

export const INSERT_ITEM_SUCCESS = 'INSERT_ITEM_SUCCESS';
export type INSERT_ITEM_SUCCESS_TYPE = typeof INSERT_ITEM_SUCCESS;
interface IInsertItemSuccessAction extends IPayloadAction<InsertItemPayload> {
  readonly type: INSERT_ITEM_SUCCESS_TYPE;
  payload: InsertItemPayload;
}

export const INSERT_ITEM_ERROR = 'INSERT_ITEM_ERROR';
export type INSERT_ITEM_ERROR_TYPE = typeof INSERT_ITEM_ERROR;
interface IInsertItemErrorAction extends Action {
  readonly type: INSERT_ITEM_ERROR_TYPE;
}

export const INSERT_ITEM_COMPLETE = 'INSERT_ITEM_COMPLETE';
export type INSERT_ITEM_COMPLETE_TYPE = typeof INSERT_ITEM_COMPLETE;
interface IInsertItemCompleteAction extends Action {
  readonly type: INSERT_ITEM_COMPLETE_TYPE;
}

// ITEM UPDATE
export const UPDATE_ITEM_LOADING = 'UPDATE_ITEM_LOADING';
export type UPDATE_ITEM_LOADING_TYPE = typeof UPDATE_ITEM_LOADING;
interface IUpdateItemLoadingAction extends Action {
  readonly type: UPDATE_ITEM_LOADING_TYPE;
}

export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export type UPDATE_ITEM_SUCCESS_TYPE = typeof UPDATE_ITEM_SUCCESS;
interface IUpdateItemSuccessAction extends IPayloadAction<UpdateItemPayload> {
  readonly type: UPDATE_ITEM_SUCCESS_TYPE;
  payload: UpdateItemPayload;
}

export const UPDATE_ITEM_ERROR = 'UPDATE_ITEM_ERROR';
export type UPDATE_ITEM_ERROR_TYPE = typeof UPDATE_ITEM_ERROR;
interface IUpdateItemErrorAction extends Action {
  readonly type: UPDATE_ITEM_ERROR_TYPE;
}

export const UPDATE_ITEM_COMPLETE = 'UPDATE_ITEM_COMPLETE';
export type UPDATE_ITEM_COMPLETE_TYPE = typeof UPDATE_ITEM_COMPLETE;
interface IUpdateItemCompleteAction extends Action {
  readonly type: UPDATE_ITEM_COMPLETE_TYPE;
}

// ITEM DELETE
export const DELETE_ITEM_LOADING = 'DELETE_ITEM_LOADING';
export type DELETE_ITEM_LOADING_TYPE = typeof DELETE_ITEM_LOADING;
interface IDeleteItemLoadingAction extends Action {
  readonly type: DELETE_ITEM_LOADING_TYPE;
}

export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export type DELETE_ITEM_SUCCESS_TYPE = typeof DELETE_ITEM_SUCCESS;
interface IDeleteItemSuccessAction extends IPayloadAction<DeleteItemPayload> {
  readonly type: DELETE_ITEM_SUCCESS_TYPE;
  payload: DeleteItemPayload;
}

export const DELETE_ITEM_ERROR = 'DELETE_ITEM_ERROR';
export type DELETE_ITEM_ERROR_TYPE = typeof DELETE_ITEM_ERROR;
interface IDeleteItemErrorAction extends Action {
  readonly type: DELETE_ITEM_ERROR_TYPE;
}

export const DELETE_ITEM_COMPLETE = 'DELETE_ITEM_COMPLETE';
export type DELETE_ITEM_COMPLETE_TYPE = typeof DELETE_ITEM_COMPLETE;
interface IDeleteItemCompleteAction extends Action {
  readonly type: DELETE_ITEM_COMPLETE_TYPE;
}


export const ITEM_ERROR_CLEAR = 'ITEM_ERROR_CLEAR';
export type ITEM_ERROR_CLEAR_TYPE = typeof ITEM_ERROR_CLEAR;
interface IItemErrorClearAction extends Action {
  readonly type: ITEM_ERROR_CLEAR_TYPE;
}

export const fetchItem: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (itemId: number) => {
    return ActionUtil.createAsyncChain(
      itemAPI.get,
      {
        loading: FETCH_ITEM_LOADING,
        success: FETCH_ITEM_SUCCESS,
        error: FETCH_ITEM_ERROR,
        complete: FETCH_ITEM_COMPLETE
      },
      itemId
    );
  };

export const fetchItems: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return ActionUtil.createAsyncChain(
      itemAPI.getAll,
      {
        loading: FETCH_ITEMS_LOADING,
        success: FETCH_ITEMS_SUCCESS,
        error: FETCH_ITEMS_ERROR,
        complete: FETCH_ITEMS_COMPLETE
      }
    );
  };

export const createItem: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (payload: IItemInsertRequest) => {
    return ActionUtil.createAsyncChain(
      itemAPI.insert,
      {
        loading: INSERT_ITEM_LOADING,
        success: INSERT_ITEM_SUCCESS,
        error: INSERT_ITEM_ERROR,
        complete: INSERT_ITEM_COMPLETE
      },
      payload
    );
  };


export const updateItem: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (payload: IItemUpdateRequest) => {
    return ActionUtil.createAsyncChain(
      itemAPI.update,
      {
        loading: UPDATE_ITEM_LOADING,
        success: UPDATE_ITEM_SUCCESS,
        error: UPDATE_ITEM_ERROR,
        complete: UPDATE_ITEM_COMPLETE
      },
      payload
    );
  };

export const deleteItem: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (itemId: number) => {
    return ActionUtil.createAsyncChain(
      itemAPI.delete,
      {
        loading: DELETE_ITEM_LOADING,
        success: DELETE_ITEM_SUCCESS,
        error: DELETE_ITEM_ERROR,
        complete: DELETE_ITEM_COMPLETE
      },
      itemId
    );
  };


export const toggleEditItem: ActionCreator<Action> = (edit: boolean) => {
  return {
    type: TOGGLE_EDIT_ITEM,
    payload: edit
  };
};

export const toggleManageItem: ActionCreator<Action> = (manage: boolean) => {
  return {
    type: TOGGLE_MANAGE_ITEM,
    payload: manage
  };
};

export const clearFetchedItem: ActionCreator<Action> = () => {
  return {
    type: CLEAR_FETCHED_ITEM
  };
};

export const clearItemErrors: ActionCreator<Action> = () => {
  return {
    type: ITEM_ERROR_CLEAR
  };
};

export type ItemAction =
  IFetchItemLoadingAction
  | IFetchItemSuccessAction
  | IFetchItemErrorAction
  | IFetchItemCompleteAction
  | IFetchItemsLoadingAction
  | IFetchItemsSuccessAction
  | IFetchItemsErrorAction
  | IFetchItemsCompleteAction
  | IToggleEditItemAction
  | IToggleManageItemAction
  | IClearFetchedItemAction
  | IInsertItemLoadingAction
  | IInsertItemSuccessAction
  | IInsertItemErrorAction
  | IInsertItemCompleteAction
  | IUpdateItemLoadingAction
  | IUpdateItemSuccessAction
  | IUpdateItemErrorAction
  | IUpdateItemCompleteAction
  | IDeleteItemLoadingAction
  | IDeleteItemSuccessAction
  | IDeleteItemErrorAction
  | IDeleteItemCompleteAction
  | IItemErrorClearAction;