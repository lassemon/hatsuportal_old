import { ITag } from 'interfaces/tag';

/**
 * @tsoaModel
 */
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

/**
 * @tsoaModel
 */
export interface IDBItem {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  modified?: Date;
  author_id: number;
  author_name: string;
}

/**
 * @tsoaModel
 */
export interface IItemInsertRequest {
  type: string;
  title: string;
  description: string;
  content: string;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface IDBItemInsert {
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  author_id: number;
}

/**
 * @tsoaModel
 */
export interface IItemUpdateRequest {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface IDBItemUpdate {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  modified: Date;
  author_id: number;
}
