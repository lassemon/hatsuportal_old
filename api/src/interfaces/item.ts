import { Tag } from 'interfaces/tag';

/**
 * @tsoaModel
 */
export interface Item {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  modified?: Date;
  authorId: number;
  authorName: string;
  tags: Tag[];
}

/**
 * @tsoaModel
 */
export interface ItemInsertRequest {
  type: string;
  title: string;
  description: string;
  content: string;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface DBItemInsert {
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
export interface ItemUpdateRequest {
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
export interface DBItemUpdate {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  modified: Date;
  author_id: number;
}
