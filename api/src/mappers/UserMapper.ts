import ApiError from 'errors/ApiError';
import {
  IUserInsertQuery, IUserInsertRequest,
  IUserUpdateQuery, IUserUpdateRequest
} from 'interfaces/requests';
import { IUserResponse } from 'interfaces/responses';
import { IDBUser, IUser } from 'interfaces/user';
import Encryption from 'security/Encryption';

export default class UserMapper {

  public mapToResponse(user: IUser): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created: user.created
    };
  }

  public mapAllToResponse(users: IUser[]): IUserResponse[] {
    return users.map(this.mapToResponse, this);
  }

  public async mapInsertToQuery(insertRequest: IUserInsertRequest): Promise<IUserInsertQuery> {
    const encryptedPassword = await Encryption.encryptPassword(insertRequest.password);

    const userInsert = {
      ...insertRequest,
      password: encryptedPassword,
      created: new Date()
    };

    if (insertRequest.password === userInsert.password) {
      throw new ApiError('BadRequest', 400, 'Attempted to add unencrypted password to database');
    }

    return userInsert;
  }

  public async mapUpdateToQuery(updateRequest: IUserUpdateRequest): Promise<IUserUpdateQuery> {
    const encryptedPassword = await Encryption.encryptPassword(updateRequest.password);

    const userInsert = {
      ...updateRequest,
      password: encryptedPassword
    };

    if (updateRequest.password === userInsert.password) {
      throw new ApiError('BadRequest', 400, 'Attempted to add unencrypted password to database');
    }

    return userInsert;
  }

  public serialize(user: IDBUser): IUser {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      created: new Date(user.created)
    };
  }

  public serializeAll(users: IDBUser[]): IUser[] {
    return users.map(this.serialize, this);
  }

}