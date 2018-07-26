
export interface IRootState {
  items: IItemsState;
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