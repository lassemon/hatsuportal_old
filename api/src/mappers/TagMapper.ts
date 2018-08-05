import { ITagResponse } from 'interfaces/responses';
import { IDBTag, ITag } from 'interfaces/tag';

export default class TagMapper {

  public map(tag: ITag): ITagResponse {
    return tag as ITagResponse;
  }

  public mapAll(tags: ITag[]): ITagResponse[] {
    return tags.map(this.map, this);
  }

  public serialize(tag: IDBTag): ITag {
    return tag;
  }

  public serializeAll(tags: IDBTag[]): ITag[] {
    return tags.map(this.serialize, this);
  }

}