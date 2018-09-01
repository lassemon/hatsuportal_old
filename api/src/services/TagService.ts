import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import {
  IItemTagInsertQuery, ITagInsertRequest,
  ITagsForItemQuery, ITagUpdateRequest
} from 'interfaces/requests';
import { isEmpty } from 'lodash';

import { IDBItemTag, IDBTag, ITag } from 'interfaces/tag';
import { each, find, head, toLower } from 'lodash';
import TagMapper from 'mappers/TagMapper';
import TagModel from 'models/TagModel';
import Logger from 'utils/Logger';

const log = new Logger('TagService');

export default class TagService {

  private tagModel: TagModel;
  private tagMapper: TagMapper;

  constructor() {
    this.tagModel = new TagModel({
      tableName: 'tags',
      connection
    });
    this.tagMapper = new TagMapper();
  }

  public async getAll(): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.getAll();
      return this.tagMapper.serializeAll(tags);
    } catch (error) {
      log.error(error);
      throw new ApiError(404, 'TagNotFound', 'Tags not found');
    }
  }

  public async find(filter): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.find(filter) as IDBTag[];
      if (isEmpty(tags)) {
        throw new ApiError(404, 'ItemNotFound', 'Items not found');
      }
      return this.tagMapper.serializeAll(tags);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'TagNotFound', 'Tags not found');
    }
  }

  public async findById(id: number): Promise<ITag> {
    try {
      const tag = await this.tagModel.findById(id) as IDBTag;
      if (isEmpty(tag)) {
        throw new ApiError(404, 'ItemNotFound', 'Items not found');
      }
      return this.tagMapper.serialize(tag);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'TagNotFound', 'Tag not found with id: ' + id);
    }
  }

  public async findByItem(itemId: number): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.findByItemId(itemId);
      return this.tagMapper.serializeAll(tags);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      return Promise.resolve([]);
    }
  }

  public count(): Promise<number> {
    try {
      return this.tagModel.count() as Promise<number>;
    } catch (error) {
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag count failed');
    }
  }

  public async insert(tagInsert: ITagInsertRequest): Promise<ITag> {
    try {
      if (await this.tagExists(tagInsert.name)) {
        throw new ApiError(409, 'Conflict', 'Tag \'' + tagInsert.name + '\' already exists');
      }
      const tag = await this.tagModel.insert(this.tagMapper.mapInsertToQuery(tagInsert));
      return this.tagMapper.serialize(head(tag));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag insert failed');
    }
  }

  public async addTagsToItem(tagsForItemInsert: ITagsForItemQuery): Promise<IDBItemTag[]> {
    try {
      const itemTags = await this.tagModel.addToItem(
        tagsForItemInsert.tags.map(
          tag => (
            {
              item_id: tagsForItemInsert.itemId,
              tag_id: tag
            }
          ) as IItemTagInsertQuery
        )
      );
      return itemTags;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag insert failed');
    }
  }

  public async update(tagUpdate: ITagUpdateRequest): Promise<ITag> {
    try {
      const tag = await this.tagModel.update(
        this.tagMapper.mapUpdateToQuery(tagUpdate)
      ) as IDBTag;
      return this.tagMapper.serialize(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag update failed');
    }
  }

  public async remove(id: number): Promise<boolean> {
    try {
      const success = await this.tagModel.remove(id);

      if (!success) {
        throw new ApiError(404, 'NotFound', 'Tag remove failed');
      }

      return success;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag remove failed');
    }
  }

  public async removeAllFromItem(itemId: number): Promise<void> {
    try {
      const success = await this.tagModel.removeAllFromItem(itemId);
      if (!success) {
        log.debug('Item with id: ' + itemId + ' has no tags to remove');
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'Tag remove failed');
    }
  }

  public async tagExists(tagName: string): Promise<boolean> {
    const currentTags = await this.tagModel.getAll();
    const currentTagsLower = currentTags.map((tag) => ({ id: tag.id, name: toLower(tag.name) }));
    const tagExists = !!find(currentTagsLower, ['name', toLower(tagName)]);
    return tagExists;
  }

  public async allTagsExist(tagIds: number[]): Promise<boolean> {
    const tags = await this.tagModel.findByIds(tagIds);

    let allTagsExist = true;
    each(tagIds, (tagId) => {
      if (!find(tags, (tag) => tag.id === tagId)) {
        allTagsExist = false;
        return false;
      }
    });
    return allTagsExist;
  }

  public setModel(model: TagModel) {
    this.tagModel = model;
  }
}
