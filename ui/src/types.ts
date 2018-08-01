
export interface IRootState {
  items: IItemsState;
  tags: ITagsState;
}

export interface IItemsState {
  loadingItems: boolean;
  items: string[];
  error: boolean;
}

export interface IPayloadAction<T> {
  type: string;
  payload: T;
}

export type GetItemsPayload = string[];

export interface ITagsState {
  loadingTags: boolean;
  tags: string[];
  error: boolean;
}


export type GetTagsPayload = string[];