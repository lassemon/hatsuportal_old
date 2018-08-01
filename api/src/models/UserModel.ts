import Model from '@ruanmartinelli/knex-model';
import { IDBUser } from 'interfaces/user'

export default class UserModel extends Model {
  constructor(options) {
    super(options);
  }

  public getAll(): Promise<IDBUser[]> {
    return new Promise((resolve, reject) => {
      this.knex('users').select('*').then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
