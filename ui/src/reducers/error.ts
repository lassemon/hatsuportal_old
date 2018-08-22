
import {
  ErrorAction,
  GLOBAL_ERROR
} from 'actions/error';
import { IErrorState } from 'types';

const initialState = {};

export default (state: IErrorState = initialState, action: ErrorAction) => {
  switch (action.type) {
    case GLOBAL_ERROR:
      return {
        ...state,
        globalError: action.payload
      };
    default:
      return state;
  }
};