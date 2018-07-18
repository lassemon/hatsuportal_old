import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { Tag } from 'interfaces/tag';
import TagModel from 'models/TagModel';
import Logger from 'utils/Logger';

const log = new Logger('TagService');

export default class TagService {

  private Tag: TagModel;

  constructor() {
    this.Tag = new TagModel({
      tableName: 'tags',
      connection
    });
  }

  public async getAll(): Promise<Tag[]> {
    try {
      const tags = await this.Tag.findAll();
      return this.convertAll(tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tags not found');
    }
  }

  public async find(filter): Promise<Tag[]> {
    try {
      const tags = await this.Tag.find(filter);
      return this.convertAll(tags);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tags not found');
    }
  }

  public async findById(id: number): Promise<Tag> {
    try {
      const tag = await this.Tag.findById(id);
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('TagNotFound', 404, 'Tag not found with id: ' + id);
    }
  }

  public count(): Promise<any> {
    try {
      return this.Tag.count();
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag count failed');
    }
  }

  public async insert(tagInsert: Tag): Promise<Tag> {
    try {
      const tag = await this.Tag.insert(tagInsert);
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag insert failed');
    }
  }

  public async update(tagUpdate: Tag): Promise<Tag> {
    try {
      const tag = await this.Tag.update(tagUpdate);
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag update failed');
    }
  }

  public async upsert(tagUpdate: Tag): Promise<Tag> {
    try {
      const tag = await this.Tag.upsert(tagUpdate);
      return this.convert(tag);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag update failed');
    }
  }

  public remove(id: number): Promise<boolean> {
    try {
      return this.Tag.remove(id);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'Tag remove failed');
    }
  }

  private convert(tag: any): Tag {
    const converted: Tag = {
        id: tag.id,
        name: tag.name
      };

    return converted;
  }

  private convertAll(tags: any[]): Tag[] {
    return tags.map((tag) => {
      return this.convert(tag);
    });
  }
}
