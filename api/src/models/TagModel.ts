import Model from '@ruanmartinelli/knex-model';
import { ItemTag, TagInsert } from 'interfaces/tag';

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

  public findByIds(tagIds: number[]): Promise<any[]> {
    return this.knex('tags')
      .select('*')
      .where((builder) => {
        builder.whereIn('id', tagIds);
      });
  }

  public insert(tag: TagInsert): Promise<any> {
    return this.knex('tags').insert(tag, '*');
  }

  public addToItem(tagItems: ItemTag[]): Promise<any[]> {
    return this.knex('item_tag').insert(tagItems, '*');
  }

  public remove(tagId: number): Promise<boolean> {
    return this.knex('tags')
      .where('id', tagId)
      .del().then((result) => {
        return !!result;
      });
  }

}
