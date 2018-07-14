import Connector from 'utils/connector';
import Logger from 'utils/logger';

const log = new Logger('UserService');

export default class UserService {

  private connector;

  constructor() {
      this.connector = new Connector().getKnex();
  }

  public getUsers() {
    log.info('Getting users');
    return this.connector.select('*').from('users');
  }
}
