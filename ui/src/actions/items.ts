import itemAPI from 'api/items'
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetItemsPayload, IPayloadAction, IRootState } from 'types';

export const LOADING_ITEMS = 'LOADING_ITEMS';
export type LOADING_ITEMS_TYPE = typeof LOADING_ITEMS;
interface ILoadingItemsAction extends Action {
  readonly type: LOADING_ITEMS_TYPE;
}

export const GET_ITEMS = 'GET_ITEMS';
export type GET_ITEMS_TYPE = typeof GET_ITEMS;
interface IGetItemsAction extends IPayloadAction<GetItemsPayload> {
  readonly type: GET_ITEMS_TYPE;
  payload: GetItemsPayload;
}

export type ItemAction = ILoadingItemsAction 
                        | IGetItemsAction;

export const fetchItems: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return async (dispatch: Dispatch<Action>): Promise<Action> => {
      dispatch({
        type: LOADING_ITEMS
      });

      const items = await itemAPI.getItems();

      return dispatch({
        payload: items,
        type: GET_ITEMS
      });
    };
  };
