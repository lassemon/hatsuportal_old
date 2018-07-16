import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { Item } from 'interfaces/item';
import ItemModel from 'models/ItemModel';
import Logger from 'utils/logger';

const log = new Logger('ItemService');

export default class ItemService {

  private Item: ItemModel;

  constructor() {
    this.Item = new ItemModel({
      tableName: 'items',
      connection
    });
  }

  public async getAll(): Promise<Item[]> {
    try {
      const items = await this.Item.getAll();
      return this.convertAll(items);
    } catch (error) {
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  private convert(item: any): Item {
    const converted: Item = {
        id: item.id,
        type: item.type,
        title: item.title,
        description: item.description,
        content: item.content,
        created: new Date(item.created),
        authorId: item.authod_id
      };

    return converted;
  }

  private convertAll(items: any[]): Item[] {
    return items.map(this.convert);
  }
}
