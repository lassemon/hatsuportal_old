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