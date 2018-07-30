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
export interface ITagInsertRequest {
  name: string;
}

/**
 * @tsoaModel
 */
export interface IDBTagInsert {
  name: string;
}

/**
 * @tsoaModel
 */
export interface IDBTagsForItemInsert {
  itemId: number;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface IDBItemTag {
  item_id: number;
  tag_id: number;
}

/**
 * @tsoaModel
 */
export interface ITagUpdateRequest {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface IDBTagUpdate {
  id: number;
  name: string;
}
