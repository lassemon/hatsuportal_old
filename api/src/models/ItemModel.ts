import Model from '@ruanmartinelli/knex-model';
import { IDBItem } from 'interfaces/item';
import { IItemInsertQuery } from 'interfaces/requests';

export default class ItemModel extends Model {
  constructor(options) {
    super(options);
  }

  public getAll(): Promise<IDBItem[]> {
    return new Promise((resolve, reject) => {
      this.knex('items as items')
        .join('users as users', 'users.id', 'items.author_id')
        .select(['items.*', 'users.name as author_name'])
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public insert(item: IItemInsertQuery): Promise<IDBItem[]> {
    return this.knex('items').insert(item, '*');
  }
}
