import { IDBItem, IItem } from 'interfaces/item';
import { IItemResponse } from 'interfaces/responses';
import TagMapper from './TagMapper';

export default class ItemMapper {

  private tagMapper: TagMapper;

  constructor() {
    this.tagMapper = new TagMapper();
  }

  public map(item: IItem): IItemResponse {
    return {
      ...item,
      tags: this.tagMapper.mapAll(item.tags)
    };
  }

  public mapAll(items: IItem[]): IItemResponse[] {
    return items.map(this.map, this);
  }

  public serialize(item: IDBItem): IItem {
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      content: item.content,
      created: new Date(item.created),
      modified: item.modified || null,
      authorId: item.author_id,
      authorName: item.author_name,
      tags: []
    };
  }

  public serializeAll(items: IDBItem[]): IItem[] {
    return items.map(this.serialize, this);
  }

}