import { ActionCreator, Dispatch } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { IAsyncChainOptions, IRootState } from "types";

export default class ActionUtil {

  /*tslint:disable no-any*/
  public static createAsyncChain: ActionCreator<ThunkAction<Promise<Action>, IRootState, void, Action>> = (fetch: (payload?: any) => Promise<any>, options: IAsyncChainOptions, payload?: any) => {
    /*tslint:enable no-any*/
    return async (dispatch: Dispatch<Action>): Promise<Action> => {
      dispatch({
        type: options.loading
      });

      try {
        const reponse = await fetch(payload);
        dispatch({
          payload: reponse,
          type: options.success
        });
      } catch (error) {
        dispatch({
          type: options.error,
          error: true,
          payload: {
            status: error.status,
            error
          }
        });
      }

      return dispatch({
        type: options.complete
      });

    };
  }
}