import Model from '@ruanmartinelli/knex-model';
import { Tag } from 'interfaces/tag';

export default class TagModel extends Model {
  constructor(options) {
    super(options);
  }

  public findAll(): Promise<any> {
    return this.knex('tags').select('*');
  }

  public findByItemId(itemId: number): Promise<any[]> {
    return this.knex('tags')
      .join('item_tag as item_tag', 'tags.id', 'item_tag.tag_id')
      .select('tags.*')
      .where('item_tag.item_id', itemId);
  }

  public insert(tag: Tag): Promise<any> {
    return this.knex('tags').insert(tag, '*');
  }

  public remove(tagId: number): Promise<boolean> {
    return this.knex('tags')
      .where('id', tagId)
      .del().then((result) => {
        return !!result;
      });
  }

}
