import asyncChain from 'actions/asyncChain';
import authAPI from 'api/auth';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetTagsPayload, IPayloadAction, IRootState } from 'types';

export const LOGIN_LOADING = 'LOGIN_LOADING';
export type LOGIN_LOADING_TYPE = typeof LOGIN_LOADING;
interface ILoadingLoginAction extends Action {
  readonly type: LOGIN_LOADING_TYPE;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export type LOGIN_SUCCESS_TYPE = typeof LOGIN_SUCCESS;
interface ISuccessLoginAction extends IPayloadAction<GetTagsPayload> {
  readonly type: LOGIN_SUCCESS_TYPE;
  payload: GetTagsPayload;
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
export type LOGIN_ERROR_TYPE = typeof LOGIN_ERROR;
interface IErrorLoginAction extends Action {
  readonly type: LOGIN_ERROR_TYPE;
}

export const LOGIN_COMPLETE = 'LOGIN_COMPLETE';
export type LOGIN_COMPLETE_TYPE = typeof LOGIN_COMPLETE;
interface ICompleteLoginAction extends Action {
  readonly type: LOGIN_COMPLETE_TYPE;
}

export const LOGIN_RESET = 'LOGIN_RESET';
export type LOGIN_RESET_TYPE = typeof LOGIN_RESET;
interface IResetLoginAction extends Action {
  readonly type: LOGIN_RESET_TYPE;
}

export const login: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = (username: string, password: string) => {
    return asyncChain(authAPI.login, {
      loading: LOGIN_LOADING,
      success: LOGIN_SUCCESS,
      error: LOGIN_ERROR,
      complete: LOGIN_COMPLETE
    }, {
        username, password
      });
  };

export const loginReset: ActionCreator<Action> = () => {
  return {
    type: LOGIN_RESET
  };
};

export const LOGOUT_LOADING = 'LOGOUT_LOADING';
export type LOGOUT_LOADING_TYPE = typeof LOGOUT_LOADING;
interface ILoadingLogoutAction extends Action {
  readonly type: LOGOUT_LOADING_TYPE;
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export type LOGOUT_SUCCESS_TYPE = typeof LOGOUT_SUCCESS;
interface ISuccessLogoutAction extends IPayloadAction<GetTagsPayload> {
  readonly type: LOGOUT_SUCCESS_TYPE;
  payload: GetTagsPayload;
}

export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export type LOGOUT_ERROR_TYPE = typeof LOGOUT_ERROR;
interface IErrorLogoutAction extends Action {
  readonly type: LOGOUT_ERROR_TYPE;
}

export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE';
export type LOGOUT_COMPLETE_TYPE = typeof LOGOUT_COMPLETE;
interface ICompleteLogoutAction extends Action {
  readonly type: LOGOUT_COMPLETE_TYPE;
}

export const logout: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return asyncChain(authAPI.logout, {
      loading: LOGOUT_LOADING,
      success: LOGOUT_SUCCESS,
      error: LOGOUT_ERROR,
      complete: LOGOUT_COMPLETE
    });
  };

export type AuthAction = ILoadingLoginAction
  | ISuccessLoginAction
  | IErrorLoginAction
  | ICompleteLoginAction
  | ILoadingLogoutAction
  | ISuccessLogoutAction
  | IErrorLogoutAction
  | ICompleteLogoutAction
  | IResetLoginAction;
