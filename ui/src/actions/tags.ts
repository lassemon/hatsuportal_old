import tagsAPI from 'api/tags';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GetTagsPayload, IPayloadAction, IRootState } from 'types';

export const LOADING_TAGS = 'LOADING_TAGS';
export type LOADING_TAGS_TYPE = typeof LOADING_TAGS;
interface ILoadingItemsAction extends Action {
  readonly type: LOADING_TAGS_TYPE;
}

export const GET_TAGS = 'GET_TAGS';
export type GET_TAGS_TYPE = typeof GET_TAGS;
interface IGetItemsAction extends IPayloadAction<GetTagsPayload> {
  readonly type: GET_TAGS_TYPE;
  payload: GetTagsPayload;
}

export type ItemAction = ILoadingItemsAction
  | IGetItemsAction;

export const fetchTags: ActionCreator<
  ThunkAction<Promise<Action>, IRootState, void, Action>
  > = () => {
    return async (dispatch: Dispatch<Action>): Promise<Action> => {
      dispatch({
        type: LOADING_TAGS
      });

      const tags = await tagsAPI.getAll();

      return dispatch({
        payload: tags,
        type: GET_TAGS
      });
    };
  };
