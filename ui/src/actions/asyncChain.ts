import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IRootState } from 'types';

/*tslint:disable*/
const asyncChain: ActionCreator<ThunkAction<Promise<Action>, IRootState, void, Action>> = (fetch: any, options: any) => {
  return async (dispatch: Dispatch<Action>): Promise<Action> => {
    dispatch({
      type: options.loading
    });

    try {
      const items = await fetch();
      dispatch({
        payload: items,
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