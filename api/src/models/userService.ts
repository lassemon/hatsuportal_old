import Model from '@ruanmartinelli/knex-model';
import connection from 'database/connection';
import Logger from 'utils/logger';

const log = new Logger('UserService');

const opts = {
  tableName: 'users',
  connection
};

class UserModel extends Model {
  constructor(options) {
    super(options);
  }

  public getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.knex('users').select('*').then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }
}

export default class UserService {

  private User: UserModel;

  constructor() {
    this.User = new UserModel(opts);
  }

  public getAll(): Promise<object[]> {
    return this.User.getAll();
  }

  public find(filter): Promise<object[]> {
    return this.User.find(filter);
  }

  public findById(id: number): Promise<object> {
    return this.User.findById(id);
  }

  public count() {
    return this.User.count();
  }

  public insert(user): Promise<object> {
    return this.User.insert(user);
  }

  public update(user): Promise<object> {
    return this.User.update(user);
  }

  public upsert(user): Promise<object> {
    return this.User.upsert(user);
  }

  public remove(id: number): Promise<boolean> {
    return this.User.remove(id);
  }
}
