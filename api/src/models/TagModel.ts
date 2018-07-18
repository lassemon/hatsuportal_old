import Model from '@ruanmartinelli/knex-model';
import * as _ from 'lodash';

export default class TagModel extends Model {
  constructor(options) {
    super(options);
  }

  public findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.knex('tags')
        .select('*')
      .then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

}
