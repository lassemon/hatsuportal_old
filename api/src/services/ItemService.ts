import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { IDBItem, IItem } from 'interfaces/item';
import { IItemInsertRequest, IItemUpdateRequest, ITagsForItemQuery } from 'interfaces/requests';
import { head, isEmpty } from 'lodash';
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
      const items: IItem[] = this.itemMapper.serializeAll(dbItems);
      return items;
    } catch (error) {
      log.error(error);
      throw new ApiError(404, 'ItemNotFound', 'Items not found');
    }
  }

  public async findById(id: number): Promise<IItem> {
    try {
      const dbItem = await this.itemModel.findById(id) as IDBItem;
      if (isEmpty(dbItem)) {
        throw new ApiError(404, 'ItemNotFound', 'Item not found with id: ' + id);
      }
      const item: IItem = this.itemMapper.serialize(dbItem);
      return item;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'ItemNotFound', 'Item not found with id: ' + id);
    }
  }

  public count(): Promise<number> {
    try {
      return this.itemModel.count() as Promise<number>;
    } catch (error) {
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Item count failed');
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
      throw new ApiError(400, 'BadRequest', 'Item insert failed');
    }
  }

  private async validateTagInsert(tagIds: number[]): Promise<void> {
    if (tagIds && tagIds.length > 0) {
      const tagsExist = await this.tagService.allTagsExist(tagIds);
      if (!tagsExist) {
        throw new ApiError(400, 'BadRequest', 'Attempted to add tags that do not exist');
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
      throw new ApiError(400, 'BadRequest', 'Item update failed');
    }
  }

  public async remove(id: number): Promise<boolean> {
    try {
      let success = await this.itemModel.remove(id);

      if (!success) {
        throw new ApiError(404, 'NotFound', 'Item remove failed');
      }

      success = await this.tagService.removeAllFromItem(id);

      return success;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Item remove failed');
    }
  }

  public async getTags(item: IItem): Promise<IItem> {
    const tags = await this.tagService.findByItem(item.id);
    item.tags = tags;
    return item;
  }

  public setModel(model: ItemModel) {
    this.itemModel = model;
  }

  public setTagService(tagService: TagService) {
    this.tagService = tagService;
  }

}
