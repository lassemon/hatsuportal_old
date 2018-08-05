
// --- USERS --- //

/**
 * @tsoaModel
 */
export interface IUserInsertRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * @tsoaModel
 */
export interface IUserInsertQuery {
  name: string;
  password: string;
  email: string;
  created: Date;
}

/**
 * @tsoaModel
 */
export interface IUserUpdateRequest {
  id: number;
  name: string;
  email: string;
  password: string;
}

/**
 * @tsoaModel
 */
export interface IUserUpdateQuery {
  id: number;
  name: string;
  password: string;
  email: string;
}

// --- ITEMS --- //

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
export interface IItemInsertQuery {
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
export interface IItemUpdateQuery {
  id: number;
  type: string;
  title: string;
  description: string;
  content: string;
  modified: Date;
  author_id: number;
}


// --- TAGS --- //

/**
 * @tsoaModel
 */
export interface ITagInsertRequest {
  name: string;
}

/**
 * @tsoaModel
 */
export interface ITagInsertQuery {
  name: string;
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
export interface ITagUpdateQuery {
  id: number;
  name: string;
}

/**
 * @tsoaModel
 */
export interface ITagsForItemQuery {
  itemId: number;
  tags: number[];
}

/**
 * @tsoaModel
 */
export interface IItemTagInsertQuery {
  item_id: number;
  tag_id: number;
}