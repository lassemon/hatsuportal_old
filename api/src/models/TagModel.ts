import Model from '@ruanmartinelli/knex-model';

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

  public insert(tag: any): Promise<any> {
    return this.knex('tags').insert(tag, '*');
  }

}
