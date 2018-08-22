import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { IUserInsertRequest, IUserUpdateRequest } from 'interfaces/requests';
import { IDBUser, IUser } from 'interfaces/user';
import { head, isEmpty } from 'lodash';
import UserMapper from 'mappers/UserMapper';
import UserModel from 'models/UserModel';
import Logger from 'utils/Logger';

const log = new Logger('UserService');

export default class UserService {

  private userModel: UserModel;
  private userMapper: UserMapper;

  constructor() {
    this.userModel = new UserModel({
      tableName: 'users',
      connection
    });
    this.userMapper = new UserMapper();
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const users = await this.userModel.getAll();
      return this.userMapper.serializeAll(users);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'UserNotFound', 'Users not found');
    }
  }

  public async find(filter): Promise<IUser[]> {
    try {
      const users = await this.userModel.find(filter) as IDBUser[];
      if (isEmpty(users)) {
        throw new ApiError(404, 'UserNotFound', 'Users not found');
      }
      return this.userMapper.serializeAll(users);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'UserNotFound', 'Users not found');
    }
  }

  public async findById(id: number): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id) as IDBUser[];
      if (isEmpty(user)) {
        throw new ApiError(404, 'UserNotFound', 'User not found with id: ' + id);
      }
      return this.userMapper.serialize(head(user));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'UserNotFound', 'User not found with id: ' + id);
    }
  }

  public async findByName(username: string): Promise<IUser> {
    try {
      const user = await this.userModel.findByName(username) as IDBUser[];
      if (isEmpty(user)) {
        throw new ApiError(404, 'UserNotFound', 'User not found with name: ' + username);
      }
      return this.userMapper.serialize(head(user));
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(404, 'UserNotFound', 'User not found with name: ' + username);
    }
  }


  public count(): Promise<number> {
    try {
      return this.userModel.count() as Promise<number>;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'User count failed');
    }
  }

  public async insert(insertRequest: IUserInsertRequest): Promise<IUser> {
    try {
      const userInsert = await this.userMapper.mapInsertToQuery(insertRequest);
      const user = await this.userModel.insert(userInsert);
      return this.userMapper.serialize(head(user)) as IUser;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'User insert failed');
    }
  }

  public async update(updateRequest: IUserUpdateRequest): Promise<IUser> {
    try {
      const userUpdate = await this.userMapper.mapUpdateToQuery(updateRequest);
      const user = await this.userModel.update(userUpdate) as IDBUser;
      return this.userMapper.serialize(user);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'User update failed');
    }
  }

  public remove(id: number): Promise<boolean> {
    try {
      return this.userModel.remove(id);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      log.error(error);
      throw new ApiError(400, 'BadRequest', 'User remove failed');
    }
  }

  public setModel(model: UserModel) {
    this.userModel = model;
  }
}
