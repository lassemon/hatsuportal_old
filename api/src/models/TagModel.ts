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

  public findByItemId(itemId: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.knex('tags')
        .join('item_tag as item_tag', 'tags.id', 'item_tag.tag_id')
        .select('tags.*')
        .where('item_tag.item_id', itemId)
      .then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

}
