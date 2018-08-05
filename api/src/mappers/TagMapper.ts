import {
  ITagInsertQuery, ITagInsertRequest,
  ITagUpdateQuery, ITagUpdateRequest
} from 'interfaces/requests';
import { ITagResponse } from 'interfaces/responses';
import { IDBTag, ITag } from 'interfaces/tag';

export default class TagMapper {

  public mapToResponse(tag: ITag): ITagResponse {
    return tag as ITagResponse;
  }

  public mapAllToResponse(tags: ITag[]): ITagResponse[] {
    return tags.map(this.mapToResponse, this);
  }

  public mapInsertToQuery(tagInsert: ITagInsertRequest): ITagInsertQuery {
    return tagInsert as ITagInsertQuery;
  }

  public mapUpdateToQuery(tagUpdate: ITagUpdateRequest): ITagUpdateQuery {
    return tagUpdate as ITagUpdateQuery;
  }

  public serialize(tag: IDBTag): ITag {
    return tag;
  }

  public serializeAll(tags: IDBTag[]): ITag[] {
    return tags.map(this.serialize, this);
  }

}