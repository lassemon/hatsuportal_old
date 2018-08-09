import { ITag } from './tag';

// --- USERS --- //
/**
 * @tsoaModel
 */
export interface ILoginResponse {
  authToken: string;
  id?: number;
  name?: string;
  email?: string;
}

/**
 * @tsoaModel
 */
export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  created: Date;
}

// --- ITEMS --- //

/**
 * @tsoaModel
 */
export interface IItemResponse {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  modified?: Date;
  authorId: number;
  authorName: string;
  tags: ITagResponse[];
}


// --- TAGS --- //

/**
 * @tsoaModel
 */
export interface ITagResponse extends ITag { }