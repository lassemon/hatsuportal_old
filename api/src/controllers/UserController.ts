import UserMapper from 'mappers/UserMapper';
import UserService from 'services/UserService';
import { Body, Controller, Get, Post, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { IUserInsertRequest, IUserUpdateRequest } from '../interfaces/requests';
import { IUserResponse } from '../interfaces/responses';

const log = new Logger('UserController');

@Route('v1/users')
export class UserController extends Controller {

  private userService: UserService;
  private userMapper: UserMapper;

  constructor() {
    super();
    this.userService = new UserService();
    this.userMapper = new UserMapper();
  }

  @Tags('users')
  @Get()
  public async getAll(): Promise<IUserResponse[]> {
    log.debug('getting all users');
    return this.userMapper.mapAllToResponse(await this.userService.getAll());
  }

  @Tags('users')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<IUserResponse> {
    log.debug('getting user with id: ' + id);
    return this.userMapper.mapToResponse(await this.userService.findById(id));
  }

  @Tags('users')
  @Post()
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: IUserInsertRequest): Promise<IUserResponse> {
    log.debug('inserting user: ' + JSON.stringify(request));
    return this.userMapper.mapToResponse(await this.userService.insert(request));
  }

  @Tags('users')
  @Put()
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: IUserUpdateRequest): Promise<IUserResponse> {
    // TODO validate that logged in user is the same as the one being updated
    log.debug('updating user with id: ' + request.id);
    return this.userMapper.mapToResponse(await this.userService.update(request));
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
