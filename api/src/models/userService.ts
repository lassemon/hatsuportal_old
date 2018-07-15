import Model from '@ruanmartinelli/knex-model';
import connection from 'database/connection';
import { User } from 'interfaces/user';
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

  public getAll(): Promise<any> {
    return this.User.getAll();
  }

  public find() {
    return this.User.find.apply(this, arguments);
  }

  public findById(id: number) {
    return this.User.findById(id);
  }

  public count() {
    return this.User.count.apply(this, arguments);
  }

  public insert() {
    return this.User.insert.apply(this, arguments);
  }

  public update() {
    return this.User.update.apply(this, arguments);
  }

  public upsert() {
    return this.User.upsert.apply(this, arguments);
  }

  public remove() {
    return this.User.remove.apply(this, arguments);
  }
}
