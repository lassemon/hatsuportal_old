import Connector from 'utils/connector';
import Logger from 'utils/logger';

const log = new Logger('ItemService');

export default class UserService {

  private connector;

  constructor() {
      this.connector = new Connector().getKnex();
  }

  public getItems() {
    log.info('Getting users in service');
    return this.connector.select('*').from('items');
  }
}
