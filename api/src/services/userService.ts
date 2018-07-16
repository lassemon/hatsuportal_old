import connection from 'database/connection';
import ApiError from 'errors/ApiError';
import { User } from 'interfaces/user';
import UserModel from 'models/UserModel';
import Logger from 'utils/logger';

const log = new Logger('UserService');

export default class UserService {

  private User: UserModel;

  constructor() {
    this.User = new UserModel({
      tableName: 'users',
      connection
    });
  }

  public async getAll(): Promise<User[]> {
    try {
      const users = await this.User.getAll();
      return this.convertAll(users);
    } catch (error) {
      throw new ApiError('UserNotFound', 404, 'Users not found');
    }
  }

  public async find(filter): Promise<User[]> {
    try {
      const users = await this.User.find(filter);
      return this.convertAll(users);
    } catch (error) {
      throw new ApiError('UserNotFound', 404, 'Users not found');
    }
  }

  public async findById(id: number): Promise<User> {
    try {
      const user = await this.User.findById(id);
      return this.convert(user);
    } catch (error) {
      throw new ApiError('UserNotFound', 404, 'User not found with id: ' + id);
    }
  }

  public count(): Promise<any> {
    try {
      return this.User.count();
    } catch (error) {
      throw new ApiError('BadRequest', 400, 'User count failed');
    }
  }

  public async insert(userInsert: User): Promise<User> {
    try {
      const user = await this.User.insert(userInsert);
      return this.convert(user);
    } catch (error) {
      throw new ApiError('BadRequest', 400, 'User insert failed');
    }
  }

  public async update(userUpdate: User): Promise<User> {
    try {
      const user = await this.User.update(userUpdate);
      return this.convert(user);
    } catch (error) {
      throw new ApiError('BadRequest', 400, 'User update failed');
    }
  }

  public async upsert(userUpdate: User): Promise<User> {
    try {
      const user = await this.User.upsert(userUpdate);
      return this.convert(user);
    } catch (error) {
      throw new ApiError('BadRequest', 400, 'User update failed');
    }
  }

  public remove(id: number): Promise<boolean> {
    try {
      return this.User.remove(id);
    } catch (error) {
      throw new ApiError('BadRequest', 400, 'User remove failed');
    }
  }

  private convert(user: any): User {
    const converted: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        created: new Date(user.created)
      };

    return converted;
  }

  private convertAll(users: any[]): User[] {
    return users.map(this.convert);
  }
}
