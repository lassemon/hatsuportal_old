import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { DBItemInsert, DBItemUpdate, Item, ItemInsertRequest, ItemUpdateRequest  } from 'interfaces/item';
import { DBTagsForItemInsert } from 'interfaces/tag';
import { head } from 'lodash';
import ItemModel from 'models/ItemModel';
import TagService from 'services/TagService';
import Logger from 'utils/logger';

const log = new Logger('ItemService');

export default class ItemService {

  private itemModel: ItemModel;
  private tagService: TagService;

  constructor() {
    this.itemModel = new ItemModel({
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
      const dbItems = await this.itemModel.findAll();
      let items: Item[] = this.convertAll(dbItems);
      items = await this.getTagsForAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async find(filter): Promise<Item[]> {
    try {
      const dbItems = await this.itemModel.find(filter);
      let items: Item[] = this.convertAll(dbItems);
      items = await this.getTagsForAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async findById(id: number): Promise<Item> {
    try {
      const dbItem = await this.itemModel.findById(id);
      let item: Item = this.convert(dbItem);
      item = await this.getTags(item);
      return item;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Item not found with id: ' + id);
    }
  }

  public count(): Promise<any> {
    try {
      return this.itemModel.count();
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item count failed');
    }
  }

  public async insert(itemInsert: ItemInsertRequest): Promise<Item> {
    try {
      const tagsExist = await this.tagService.checkThatTagsExist(itemInsert.tags);
      if (!tagsExist) {
        throw new ApiError('BadRequest', 400, 'Attempted to add tags that do not exist');
      }

      const dbItem = await this.itemModel.insert({
        type: itemInsert.type,
        title: itemInsert.title,
        description: itemInsert.description,
        content: itemInsert.content,
        created: new Date(),
        author_id: 1 // TODO GET AUTHORIZED USER
      } as DBItemInsert );

      const item: Item = this.convert(head(dbItem));

      await this.tagService.addTagsToItem({itemId: item.id, tags: itemInsert.tags} as DBTagsForItemInsert);

      return await this.getTags(item);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item insert failed');
    }
  }

  public async update(itemUpdate: ItemUpdateRequest): Promise<Item> {
    try {
      const tagsExist = await this.tagService.checkThatTagsExist(itemUpdate.tags);
      if (!tagsExist) {
        throw new ApiError('BadRequest', 400, 'Attempted to add tags that do not exist');
      }

      const dbItem = await this.itemModel.update({
        id: itemUpdate.id,
        type: itemUpdate.type,
        title: itemUpdate.title,
        description: itemUpdate.description,
        content: itemUpdate.content,
        modified: new Date(),
        author_id: 1 // TODO GET AUTHORIZED USER
      } as DBItemUpdate);

      const item: Item = this.convert(dbItem);

      await this.tagService.removeAllFromItem(item.id);
      await this.tagService.addTagsToItem({itemId: item.id, tags: itemUpdate.tags} as DBTagsForItemInsert);

      return await this.getTags(item);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item update failed');
    }
  }

  public async remove(id: number): Promise<boolean> {
    try {
      let success = await this.itemModel.remove(id);

      if (!success) {
        throw new ApiError('NotFound', 404, 'Item remove failed');
      }

      success = await this.tagService.removeAllFromItem(id);

      return success;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
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
        modified: item.modified || null,
        authorId: item.author_id,
        authorName: item.author_name,
        tags: []
      };

    return converted;
  }

  private convertAll(items: any[]): Item[] {
    return items.map((item) => {
      const tags = [];
      return this.convert(item);
    });
  }

  private async getTags(item: Item): Promise<Item> {
    const tags = await this.tagService.findByItem(item.id);
    item.tags = tags;
    return item;
  }

  private async getTagsForAll(items: Item[]): Promise<Item[]> {
    const promises = items.map(this.getTags, this);
    await Promise.all(promises);
    return items;
  }
}
