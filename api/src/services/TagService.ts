import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import {
  IDBItemTag,
  IDBTag,
  IDBTagInsert,
  IDBTagsForItemInsert,
  IDBTagUpdate,
  ITag,
  ITagInsertRequest,
  ITagUpdateRequest
} from 'interfaces/tag';
import { each, find, head, toLower } from 'lodash';
import TagModel from 'models/TagModel';
import Logger from 'utils/Logger';

const log = new Logger('TagService');

export default class TagService {

  private tagModel: TagModel;

  constructor() {
    this.tagModel = new TagModel({
      tableName: 'tags',
      connection
    });
  }

  public async getAll(): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.getAll();
      return this.convertAll(tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tags not found');
    }
  }

  public async find(filter): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.find(filter) as IDBTag[];
      return this.convertAll(tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tags not found');
    }
  }

  public async findById(id: number): Promise<ITag> {
    try {
      const tag = await this.tagModel.findById(id) as IDBTag;
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tag not found with id: ' + id);
    }
  }

  public async findByItem(itemId: number): Promise<ITag[]> {
    try {
      const tags = await this.tagModel.findByItemId(itemId);
      return this.convertAll(tags);
    } catch (error) {
      log.error(error);
      return Promise.resolve([]);
    }
  }

  public count(): Promise<number> {
    try {
      return this.tagModel.count() as Promise<number>;
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag count failed');
    }
  }

  public async insert(tagInsert: ITagInsertRequest): Promise<ITag> {
    try {
      if (await this.tagExists(tagInsert.name)) {
        throw new ApiError('Conflict', 409, 'Tag \'' + tagInsert.name + '\' already exists');
      }
      const tag = await this.tagModel.insert(tagInsert as IDBTagInsert);
      return this.convert(head(tag));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag insert failed');
    }
  }

  public async addTagsToItem(tagsForItemInsert: IDBTagsForItemInsert): Promise<IDBItemTag[]> {
    try {
      const itemTags = await this.tagModel.addToItem(tagsForItemInsert.tags.map((tag) => (
        {
          item_id: tagsForItemInsert.itemId,
          tag_id: tag
        }
      )));
      return itemTags;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag insert failed');
    }
  }

  public async checkThatTagsExist(tagIds: number[]): Promise<boolean> {
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

  public async update(tagUpdate: ITagUpdateRequest): Promise<ITag> {
    try {
      const tag = await this.tagModel.update(tagUpdate as IDBTagUpdate) as IDBTag;
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag update failed');
    }
  }

  public async remove(id: number): Promise<boolean> {
    try {
      const success = await this.tagModel.remove(id);

      if (!success) {
        throw new ApiError('NotFound', 404, 'Tag remove failed');
      }

      return success;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag remove failed');
    }
  }

  public async removeAllFromItem(itemId: number): Promise<boolean> {
    try {
      const success = await this.tagModel.removeAllFromItem(itemId);

      if (!success) {
        throw new ApiError('NotFound', 404, 'Removing all tags from item ' + itemId + ' failed');
      }

      return success;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag remove failed');
    }
  }

  private convert(tag: IDBTag): ITag {
    const converted: ITag = {
      id: tag.id,
      name: tag.name
    };

    return converted;
  }

  private convertAll(tags: IDBTag[]): ITag[] {
    return tags.map((tag) => {
      return this.convert(tag);
    });
  }

  private async tagExists(tagName: string): Promise<boolean> {
    const currentTags = await this.tagModel.getAll();
    const CurrentTagsLower = currentTags.map((tag) => ({ id: tag.id, name: toLower(tag.name) }));
    const tagExists = !!find(CurrentTagsLower, ['name', toLower(tagName)]);
    return tagExists;
  }
}
