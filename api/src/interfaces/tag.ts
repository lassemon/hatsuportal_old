/**
 * @tsoaModel
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface TagInsertRequest {
  name: string;
}

/**
 * @tsoaModel
 */
export interface DBTagInsert {
  name: string;
}

/**
 * @tsoaModel
 */
export interface DBTagsForItemInsert {
  itemId: number;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface DBItemTag {
  item_id: number;
  tag_id: number;
}

/**
 * @tsoaModel
 */
export interface TagUpdateRequest {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface DBTagUpdate {
  id: number;
  name: string;
}
