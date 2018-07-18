import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { Item } from 'interfaces/item';
import { Tag } from 'interfaces/tag';
import {each} from 'lodash';
import ItemModel from 'models/ItemModel';
import TagService from 'services/TagService';
import Logger from 'utils/logger';

const log = new Logger('ItemService');

export default class ItemService {

  private Item: ItemModel;
  private tagService: TagService;

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

    this.tagService = new TagService();
  }

  public async getAll(): Promise<Item[]> {
    try {
      const dbItems = await this.Item.findAll();
      let items: Item[] = this.convertAll(dbItems);
      items = await this.addTagsToAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async find(filter): Promise<Item[]> {
    try {
      const dbItems = await this.Item.find(filter);
      let items: Item[] = this.convertAll(dbItems);
      items = await this.addTagsToAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async findById(id: number): Promise<Item> {
    try {
      const dbItem = await this.Item.findById(id);
      let item: Item = this.convert(dbItem);
      item = await this.addTags(item);
      return item;
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
      const dbItem = await this.Item.insert(itemInsert);
      let item: Item = this.convert(dbItem);
      item = await this.addTags(item);
      return item;
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item insert failed');
    }
  }

  public async update(itemUpdate: Item): Promise<Item> {
    try {
      const dbItem = await this.Item.update(itemUpdate);
      let item: Item = this.convert(dbItem);
      item = await this.addTags(item);
      return item;
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item update failed');
    }
  }

  public async upsert(itemUpdate: Item): Promise<Item> {
    try {
      const dbItem = await this.Item.upsert(itemUpdate);
      let item: Item = this.convert(dbItem);
      item = await this.addTags(item);
      return item;
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

  private convert(item: any): Item {
    const converted: Item = {
        id: item.id,
        type: item.type,
        title: item.title,
        description: item.description,
        content: item.content,
        created: new Date(item.created),
        authorId: item.author_id,
        authorName: item.author_name
      };

    return converted;
  }

  private convertAll(items: any[]): Item[] {
    return items.map((item) => {
      const tags = [];
      return this.convert(item);
    });
  }

  private async addTags(item: Item): Promise<Item> {
    const tags = await this.tagService.findByItem(item.id);
    item.tags = tags;
    return item;
  }

  private async addTagsToAll(items: Item[]): Promise<Item[]> {
    const promises = items.map(this.addTags, this);
    await Promise.all(promises);
    return items;
  }
}
