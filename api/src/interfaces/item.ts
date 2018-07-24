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
  authorId: number;
  authorName: string;
  tags: Tag[];
}

/**
 * @tsoaModel
 */
export interface ItemCreateRequest {
  type: string;
  title: string;
  description: string;
  content: string;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface ItemInsert {
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
export interface ItemUpdate {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  created: Date;
  authorId: number;
  authorName: string;
  tags: number[];
}
