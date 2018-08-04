/**
 * @tsoaModel
 */
export interface IUser {
  id: number;
  name: string;
  email: string;
  created: Date;
}

/**
 * @tsoaModel
 */
export interface IDBUser {
  id: number;
  name: string;
  password: string;
  email: string;
  created: Date;
}
