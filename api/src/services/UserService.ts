import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { IUser } from 'interfaces/user';
import UserModel from 'models/UserModel';
import Logger from 'utils/logger';

const log = new Logger('UserService');

export default class UserService {

  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel({
      tableName: 'users',
      connection
    });
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const users = await this.userModel.findAll();
      return this.convertAll(users);
    } catch (error) {
      log.error(error);
      throw new ApiError('UserNotFound', 404, 'Users not found');
    }
  }

  public async find(filter): Promise<IUser[]> {
    try {
      const users = await this.userModel.find(filter);
      return this.convertAll(users);
    } catch (error) {
      log.error(error);
      throw new ApiError('UserNotFound', 404, 'Users not found');
    }
  }

  public async findById(id: number): Promise<IUser> {
    try {
      const user = await this.userModel.findById(id);
      return this.convert(user);
    } catch (error) {
      log.error(error);
      throw new ApiError('UserNotFound', 404, 'User not found with id: ' + id);
    }
  }

  public count(): Promise<any> {
    try {
      return this.userModel.count();
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'User count failed');
    }
  }

  public async insert(userInsert: IUser): Promise<IUser> {
    try {
      const user = await this.userModel.insert(userInsert);
      return this.convert(user);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'User insert failed');
    }
  }

  public async update(userUpdate: IUser): Promise<IUser> {
    try {
      const user = await this.userModel.update(userUpdate);
      return this.convert(user);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'User update failed');
    }
  }

  public remove(id: number): Promise<boolean> {
    try {
      return this.userModel.remove(id);
    } catch (error) {
      log.error(error);
      throw new ApiError('BadRequest', 400, 'User remove failed');
    }
  }

  private convert(user: any): IUser {
    const converted: IUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      created: new Date(user.created)
    };

    return converted;
  }

  private convertAll(users: any[]): IUser[] {
    return users.map(this.convert);
  }
}
