
// Application States
export interface IRootState {
  items: IItemsState;
  tags: ITagsState;
  auth: IAuthState;
}

export interface IItemsState {
  loading: boolean;
  items: IItem[];
  error: boolean;
}

export interface ITagsState {
  loading: boolean;
  tags: ITag[];
  error: boolean;
}

export interface IAuthState {
  loginError: boolean;
  loginLoading: boolean;
  logoutError: boolean;
  logoutLoading: boolean;
  loggedIn: boolean;
  user?: IUser;
}

export interface IPayloadAction<T> {
  type: string;
  payload: T;
}

export type GetItemsPayload = string[];
export type GetTagsPayload = string[];

export interface IItemListItem {
  title: string;
  description: string;
}

export interface IAsyncChainOptions {
  loading: string;
  success: string;
  error: string;
  complete: string;
}

// requests
export interface ILoginRequest {
  username: string;
  password: string;
}

// API interfaces
export interface IUser {
  id: string;
  name: string;
  email: string;
  created: Date;
}

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