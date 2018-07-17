import Model from '@ruanmartinelli/knex-model';
import * as _ from 'lodash';

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

}
