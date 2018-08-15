import {
  AuthAction,
  LOGIN_COMPLETE,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  LOGOUT_COMPLETE,
  LOGOUT_ERROR,
  LOGOUT_LOADING,
  LOGOUT_SUCCESS
} from 'actions/auth';
import { IAuthState } from 'types';

const initialState = {
  loginError: false,
  loginLoading: false,
  logoutError: false,
  logoutLoading: false,
  loggedIn: false,
  user: undefined
};

export default (state: IAuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginError: false,
        loginLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true
      };
    case LOGIN_COMPLETE:
      return {
        ...state,
        loginLoading: false
      };
    case LOGIN_RESET:
      return {
        ...state,
        loginError: false
      };

    case LOGOUT_LOADING:
      return {
        ...state,
        logoutError: false,
        logoutLoading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: null,
        user: null
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        logoutError: true
      };
    case LOGOUT_COMPLETE:
      return {
        ...state,
        logoutLoading: false
      };
    default:
      return state;
  }
};