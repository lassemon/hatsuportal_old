import ApiError from 'errors/ApiError';
import * as jwt from 'jsonwebtoken';
import UserMapper from 'mappers/UserMapper';
import Encryption from 'security/Encryption';
import UserService from 'services/UserService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { ILoginRequest, IUserInsertRequest, IUserUpdateRequest } from '../interfaces/requests';
import { ILoginResponse, IUserResponse } from '../interfaces/responses';
import { IUser } from '../interfaces/user';

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


  @Tags('Auth')
  @Response(401, 'Unauthorized')
  @Response<ILoginResponse>(200, 'Success')
  @Post('login')
  public async login(@Body() loginParams: ILoginRequest): Promise<ILoginResponse> {
    const username: string = loginParams.username;
    const password: string = loginParams.password;

    const user: IUser = await this.userService.findByName(username);

    if (!await Encryption.compare(password, user.password)) {
      throw new ApiError('Unauthorized', 401, 'Login failed');
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name
      }
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET);

    return this.userMapper.mapToLoginResponse(user, authToken);
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
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(409, 'Conflict')
  @Response(400, 'Bad Request')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: IUserInsertRequest): Promise<IUserResponse> {
    log.debug('inserting user: ' + JSON.stringify(request));
    return this.userMapper.mapToResponse(await this.userService.insert(request));
  }

  @Tags('users')
  @Put()
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: IUserUpdateRequest): Promise<IUserResponse> {
    // TODO validate that logged in user is the same as the one being updated
    log.debug('updating user with id: ' + request.id);
    return this.userMapper.mapToResponse(await this.userService.update(request));
  }

  @Tags('users')
  @Delete('{id}')
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<boolean> {
    log.debug('deactivating user with id: ' + id);
    return this.userService.remove(id);
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
