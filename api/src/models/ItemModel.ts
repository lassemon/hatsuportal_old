import Model from '@ruanmartinelli/knex-model';
import { IDBItem } from 'interfaces/item';
import { IItemInsertQuery } from 'interfaces/requests';
import { head } from 'lodash';

export default class ItemModel extends Model {
  constructor(options) {
    super(options);
  }

  public getAll(): Promise<IDBItem[]> {
    return new Promise((resolve, reject) => {
      const itemsPromise = this.knex('items as items')
        .join('users as users', 'users.id', 'items.author_id')
        .select(['items.*', 'users.name as author_name'])
        .orderByRaw('created DESC NULLS LAST')
        .orderByRaw('modified DESC NULLS LAST');

      const tagsPromise = itemsPromise.then(async (items) => {
        const itemTags = {};
        for (const item of items) {
          const tags = await this.knex('tags')
            .join('item_tag as item_tag', 'tags.id', 'item_tag.tag_id')
            .select('tags.*')
            .where('item_tag.item_id', item.id);
          itemTags[item.id] = tags;
        }
        return itemTags;
      });

      return Promise.all([itemsPromise, tagsPromise])
        .then(([items, tags]) => {
          for (const item of items) {
            item.tags = tags[item.id];
          }
          resolve(items);
        }).catch(error => {
          reject(error);
        });
    });
  }

  public findById(id: number): Promise<IDBItem> {
    return new Promise((resolve, reject) => {
      const itemPromise = this.knex('items as items')
        .join('users as users', 'users.id', 'items.author_id')
        .select(['items.*', 'users.name as author_name'])
        .where('items.id', id).then(head);

      const tagsPromise = itemPromise.then((item) => {
        return this.knex('tags')
          .join('item_tag as item_tag', 'tags.id', 'item_tag.tag_id')
          .select('tags.*')
          .where('item_tag.item_id', item.id);
      });

      return Promise.all([itemPromise, tagsPromise])
        .then(([item, tags]) => {
          item.tags = tags;
          resolve(item);
        }).catch(error => {
          reject(error);
        });
    });
  }

  public insert(item: IItemInsertQuery): Promise<IDBItem[]> {
    return this.knex('items').insert(item, '*');
  }
}
