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
export interface TagCreateRequest {
  name: string;
}

/**
 * @tsoaModel
 */
export interface TagInsert {
  name: string;
}

/**
 * @tsoaModel
 */
export interface TagsForItemInsert {
  itemId: number;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface ItemTag {
  item_id: number;
  tag_id: number;
}

/**
 * @tsoaModel
 */
export interface TagUpdate {
  id: number;
  name: string;
}
