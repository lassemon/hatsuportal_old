import Model from '@ruanmartinelli/knex-model';
import { ItemInsert } from 'interfaces/item';

export default class ItemModel extends Model {
  constructor(options) {
    super(options);
  }

  public findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.knex('items as items')
        .join('users as users', 'users.id', 'items.author_id')
        .select(['items.*', 'users.name as author_name'])
      .then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public insert(item: ItemInsert): Promise<any> {
    return this.knex('items').insert(item, '*');
  }

}
