import UserService from 'models/userService';
import { Controller, Example, Get, Route, Tags } from 'tsoa';
import Logger from 'utils/logger';

const log = new Logger('UserController');
const service = new UserService();

@Route('v1/users')
export class UserController extends Controller {

  @Get()
  @Tags('users')
  public async users(): Promise<string> {
    return service.getUsers();
  }
}
