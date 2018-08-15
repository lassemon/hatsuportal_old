import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAsyncChainOptions, IRootState } from 'types';

/*tslint:disable no-any */
const asyncChain: ActionCreator<ThunkAction<Promise<Action>, IRootState, void, Action>> = (fetch: (payload?: any) => Promise<any>, options: IAsyncChainOptions, payload?: any) => {
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
        type: options.error
      });
    }

    return dispatch({
      type: options.complete
    });

  };
};

export default asyncChain;