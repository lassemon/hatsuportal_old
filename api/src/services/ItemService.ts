import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { IDBItem, IItem } from 'interfaces/item';
import { IItemInsertRequest, IItemUpdateRequest, ITagsForItemQuery } from 'interfaces/requests';
import { head } from 'lodash';
import ItemMapper from 'mappers/ItemMapper';
import ItemModel from 'models/ItemModel';
import Logger from 'utils/Logger';
import TagService from './TagService';

const log = new Logger('ItemService');

export default class ItemService {

  private itemModel: ItemModel;
  private tagService: TagService;
  private itemMapper: ItemMapper;

  constructor() {
    this.itemModel = new ItemModel({
      tableName: 'items',
      connection,
      columns: [
        'items.*',
        'users.id as author_id',
        'users.name as author_name'
      ],
      joins: [{ table: 'users', first: 'users.id', second: 'items.author_id' }]
    });
    this.tagService = new TagService();
    this.itemMapper = new ItemMapper();
  }

  public async getAll(): Promise<IItem[]> {
    try {
      const dbItems = await this.itemModel.getAll();
      let items: IItem[] = this.itemMapper.serializeAll(dbItems);
      items = await this.getTagsForAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async find(filter): Promise<IItem[]> {
    try {
      const dbItems = await this.itemModel.find(filter) as IDBItem[];
      let items: IItem[] = this.itemMapper.serializeAll(dbItems);
      items = await this.getTagsForAll(items);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Items not found');
    }
  }

  public async findById(id: number): Promise<IItem> {
    try {
      const dbItem = await this.itemModel.findById(id) as IDBItem;
      let item: IItem = this.itemMapper.serialize(dbItem);
      item = await this.getTags(item);
      return item;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('ItemNotFound', 404, 'Item not found with id: ' + id);
    }
  }

  public count(): Promise<number> {
    try {
      return this.itemModel.count() as Promise<number>;
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item count failed');
    }
  }

  public async insert(itemInsert: IItemInsertRequest): Promise<IItem> {
    try {
      await this.validateTagInsert(itemInsert.tags);

      const dbItem = await this.itemModel.insert(this.itemMapper.mapInsertToQuery(itemInsert));

      const item: IItem = this.itemMapper.serialize(head(dbItem));

      await this.tagService.addTagsToItem({
        itemId: item.id,
        tags: itemInsert.tags
      } as ITagsForItemQuery);

      return await this.getTags(item);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Item insert failed');
    }
  }

  private async validateTagInsert(tagIds: number[]): Promise<void> {
    if (tagIds && tagIds.length > 0) {
      const tagsExist = await this.tagService.allTagsExist(tagIds);
      if (!tagsExist) {
        throw new ApiError('BadRequest', 400, 'Attempted to add tags that do not exist');
      }
    }
  }

  public async update(itemUpdate: IItemUpdateRequest): Promise<IItem> {
    try {
      await this.validateTagInsert(itemUpdate.tags);

      const dbItem = await this.itemModel.update(
        this.itemMapper.mapUpdateToQuery(itemUpdate)
      ) as IDBItem;

      const item: IItem = this.itemMapper.serialize(dbItem);

      await this.tagService.removeAllFromItem(item.id);
      await this.tagService.addTagsToItem({
        itemId: item.id,
        tags: itemUpdate.tags
      } as ITagsForItemQuery);

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

  public async getTags(item: IItem): Promise<IItem> {
    const tags = await this.tagService.findByItem(item.id);
    item.tags = tags;
    return item;
  }

  public async getTagsForAll(items: IItem[]): Promise<IItem[]> {
    const promises = items.map(this.getTags, this);
    await Promise.all(promises);
    return items;
  }

  public setModel(model: ItemModel) {
    this.itemModel = model;
  }

  public setTagService(tagService: TagService) {
    this.tagService = tagService;
  }

}
