import { IDBItem, IItem } from 'interfaces/item';
import {
  IItemInsertQuery, IItemInsertRequest,
  IItemUpdateQuery, IItemUpdateRequest
} from 'interfaces/requests';
import { IItemResponse } from 'interfaces/responses';
import TagMapper from './TagMapper';

export default class ItemMapper {

  private tagMapper: TagMapper;

  constructor() {
    this.tagMapper = new TagMapper();
  }

  public mapToResponse(item: IItem): IItemResponse {
    return {
      ...item,
      tags: this.tagMapper.mapAllToResponse(item.tags)
    };
  }

  public mapAllToResponse(items: IItem[]): IItemResponse[] {
    return items.map(this.mapToResponse, this);
  }

  public mapInsertToQuery(itemInsert: IItemInsertRequest): IItemInsertQuery {
    return {
      type: itemInsert.type,
      title: itemInsert.title,
      description: itemInsert.description,
      content: itemInsert.content,
      created: new Date(),
      author_id: 1 // TODO GET AUTHORIZED USER
    };
  }

  public mapUpdateToQuery(itemUpdate: IItemUpdateRequest): IItemUpdateQuery {
    return {
      id: itemUpdate.id,
      type: itemUpdate.type,
      title: itemUpdate.title,
      description: itemUpdate.description,
      content: itemUpdate.content,
      modified: new Date(),
      author_id: 1 // TODO GET AUTHORIZED USER
    };
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