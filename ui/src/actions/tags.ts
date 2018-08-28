import asyncChain from 'actions/asyncChain';
import tagsAPI from 'api/tags';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetTagsPayload, IPayloadAction, IRootState } from 'types';

export const FETCH_TAGS_LOADING = 'FETCH_TAGS_LOADING';
export type FETCH_TAGS_LOADING_TYPE = typeof FETCH_TAGS_LOADING;
interface IFetchTagsLoadingAction extends Action {
  readonly type: FETCH_TAGS_LOADING_TYPE;
}

export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export type FETCH_TAGS_SUCCESS_TYPE = typeof FETCH_TAGS_SUCCESS;
interface IFetchTagsSuccessAction extends IPayloadAction<GetTagsPayload> {
  readonly type: FETCH_TAGS_SUCCESS_TYPE;
  payload: GetTagsPayload;
}

export const FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR';
export type FETCH_TAGS_ERROR_TYPE = typeof FETCH_TAGS_ERROR;
interface IFetchTagsErrorAction extends Action {
  readonly type: FETCH_TAGS_ERROR_TYPE;
}

export const FETCH_TAGS_COMPLETE = 'FETCH_TAGS_COMPLETE';
export type FETCH_TAGS_COMPLETE_TYPE = typeof FETCH_TAGS_COMPLETE;
interface IFetchTagsCompleteAction extends Action {
  readonly type: FETCH_TAGS_COMPLETE_TYPE;
}

export type TagAction =
  IFetchTagsLoadingAction
  | IFetchTagsSuccessAction
  | IFetchTagsErrorAction
  | IFetchTagsCompleteAction;

export const fetchTags: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return asyncChain(tagsAPI.getAll, {
      loading: FETCH_TAGS_LOADING,
      success: FETCH_TAGS_SUCCESS,
      error: FETCH_TAGS_ERROR,
      complete: FETCH_TAGS_COMPLETE
    });
  };
