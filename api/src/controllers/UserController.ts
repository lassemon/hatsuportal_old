import UserService from 'services/UserService';
import { Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { IUserInsertRequest } from '../interfaces/requests';
import { IUser } from '../interfaces/user';

const log = new Logger('UserController');

@Route('v1/users')
export class UserController extends Controller {

  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  @Tags('users')
  @Get()
  public async getAll(): Promise<IUser[]> {
    log.debug('getting all users');
    return this.userService.getAll();
  }

  @Tags('users')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<IUser> {
    log.debug('getting user with id: ' + id);
    return this.userService.findById(id);
  }

  @Tags('users')
  @Post()
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: IUserInsertRequest): Promise<IUser> {
    log.debug('inserting user: ' + JSON.stringify(request));
    return this.userService.insert(request);
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
