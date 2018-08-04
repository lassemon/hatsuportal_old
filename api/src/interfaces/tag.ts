/**
 * @tsoaModel
 */
export interface ITag {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface IDBTag {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface IDBItemTag {
  item_id: number;
  tag_id: number;
}