import connection from 'database/connection';
import Logger from 'utils/logger';

const log = new Logger('ItemService');

export default class UserService {

  private connector;

  constructor() {
      this.connector = connection;
  }

  public getItems() {
    log.info('Getting users in service');
    return this.connector('items').select('*');
  }
}
