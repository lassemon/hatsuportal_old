import Model from '@ruanmartinelli/knex-model';

export default class ItemModel extends Model {
  constructor(options) {
    super(options);
  }

  public getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.knex('items').select('*').then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
