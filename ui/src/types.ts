
export interface IRootState {
  items: IItemsState;
  tags: ITagsState;
}

export interface IItemsState {
  loading: boolean;
  items: IItem[];
  error: boolean;
}

export interface IPayloadAction<T> {
  type: string;
  payload: T;
}

export type GetItemsPayload = string[];

export interface ITagsState {
  loading: boolean;
  tags: ITag[];
  error: boolean;
}


export type GetTagsPayload = string[];

export interface IItemListItem {
  title: string;
  description: string;
}


// API interfaces
export interface IItem {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  modified?: Date;
  authorId: number;
  authorName: string;
  tags: ITag[];
}

export interface ITag {
  id: number;
  name: string;
}