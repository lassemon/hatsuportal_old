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
      connection,
      columns: [
        'items.*',
        'users.id as author_id',
        'users.name as author_name'
      ],
      joins: [
        { table: 'users', first: 'users.id', second: 'items.author_id' }
      ]
    });
  }

  public async getAll(): Promise<Item[]> {
    try {
      const items = await this.Item.findAll();
      return this.convertAll(items);
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async find(filter): Promise<Item[]> {
    try {
      const items = await this.Item.find(filter);
      return this.convertAll(items);
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async findById(id: number): Promise<Item> {
    try {
      const item = await this.Item.findById(id);
      const tags = [];
      return this.convert(item, tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Item not found with id: ' + id);
    }
  }

  public count(): Promise<any> {
    try {
      return this.Item.count();
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item count failed');
    }
  }

  public async insert(itemInsert: Item): Promise<Item> {
    try {
      const item = await this.Item.insert(itemInsert);
      const tags = [];
      return this.convert(item, tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item insert failed');
    }
  }

  public async update(itemUpdate: Item): Promise<Item> {
    try {
      const item = await this.Item.update(itemUpdate);
      const tags = [];
      return this.convert(item, tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item update failed');
    }
  }

  public async upsert(itemUpdate: Item): Promise<Item> {
    try {
      const item = await this.Item.upsert(itemUpdate);
      const tags = [];
      return this.convert(item, tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item update failed');
    }
  }

  public remove(id: number): Promise<boolean> {
    try {
      return this.Item.remove(id);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item remove failed');
    }
  }

  private convert(item: any, tags: any[]): Item {
    const converted: Item = {
        id: item.id,
        type: item.type,
        title: item.title,
        description: item.description,
        content: item.content,
        created: new Date(item.created),
        authorId: item.author_id,
        authorName: item.author_name,
        tags
      };

    return converted;
  }

  private convertAll(items: any[]): Item[] {
    return items.map((item) => {
      const tags = [];
      return this.convert(item, tags);
    });
  }
}
