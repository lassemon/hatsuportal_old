import Model from '@ruanmartinelli/knex-model';

export default class UserModel extends Model {
  constructor(options) {
    super(options);
  }

  public findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.knex('users').select('*').then((result) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
