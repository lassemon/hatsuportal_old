import UserService from 'services/UserService';
import { Controller, Example, Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/logger';

const log = new Logger('UserController');

@Route('v1/users')
export class UserController extends Controller {

  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Tags('user')
  @Get()
  public async getAll(): Promise<any[]> {
    return this.userService.getAll();
  }

  @Tags('user')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<any> {
    return this.userService.findById(id);
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
