import { ActionCreator } from "react-redux";
import { Action } from "redux";
import { IError, IPayloadAction } from "types";

export const GLOBAL_ERROR = 'GLOBAL_ERROR';
export type GLOBAL_ERROR_TYPE = typeof GLOBAL_ERROR;
interface IGlobalErrorAction extends IPayloadAction<IError> {
  readonly type: GLOBAL_ERROR_TYPE;
  payload: IError;
}

export const AUTH_ERROR = 'AUTH_ERROR';
export type AUTH_ERROR_TYPE = typeof AUTH_ERROR;
interface IAuthErrorAction extends IPayloadAction<IError> {
  readonly type: AUTH_ERROR_TYPE;
  payload: IError;
}

export const authError: ActionCreator<Action> = (payload: IError) => {
  return {
    type: AUTH_ERROR,
    payload
  };
};

export const globalError: ActionCreator<Action> = (payload: IError) => {
  return {
    type: GLOBAL_ERROR,
    payload: {
      title: payload.title ? payload.title : 'Error',
      message: payload.message,
      errorCode: payload.errorCode ? payload.errorCode : 400
    } as IError
  };
};

export type ErrorAction = IGlobalErrorAction
  | IAuthErrorAction; 