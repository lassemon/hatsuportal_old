import ApiError from 'errors/ApiError';
import * as express from 'express';
import UserMapper from 'mappers/UserMapper';
import * as moment from 'moment';
import Authorization from 'security/Authorization';
import Encryption from 'security/Encryption';
import UserService from 'services/UserService';
import {
  Body, Controller, Delete, Get, Post, Put, Request, Response, Route, Security, SuccessResponse, Tags
} from 'tsoa';
import Logger from 'utils/Logger';
import { ILoginRequest, IUserInsertRequest, IUserUpdateRequest } from '../interfaces/requests';
import { IUserResponse } from '../interfaces/responses';
import { IUser } from '../interfaces/user';

const log = new Logger('UserController');
const refreshTokenList = {};

@Route('v1/users')
export class UserController extends Controller {

  private userService: UserService;
  private userMapper: UserMapper;
  private authorization: Authorization;
  private cookies = {};

  constructor() {
    super();
    this.userService = new UserService();
    this.userMapper = new UserMapper();
    this.authorization = new Authorization();
  }

  @Tags('Auth')
  @Response<IUserResponse>(200, 'Success')
  @Post('login')
  public async login(@Body() loginParams: ILoginRequest): Promise<IUserResponse> {
    const username: string = loginParams.username;
    const password: string = loginParams.password;

    const user: IUser = await this.userService.findByName(username);

    if (!await Encryption.compare(password, user.password)) {
      throw new ApiError(401, 'Unauthorized', 'Login failed');
    }

    const authToken = this.authorization.createAuthToken(user);
    const refreshToken = this.authorization.createRefreshToken(user);

    this.setCookies({
      token: {
        value: authToken,
        options: {
          httpOnly: true
        }
      },
      refreshToken: {
        value: refreshToken,
        options: {
          httpOnly: true
        }
      }
    });

    refreshTokenList[refreshToken] = user;

    return this.userMapper.mapToResponse(user);
  }

  @Tags('Auth')
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(200, 'Success')
  @Post('logout')
  public logout(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.setCookies({
        token: null,
        refreshToken: null
      });
      resolve(true);
    });
  }

  @Tags('Auth')
  @Response(401, 'Unauthorized')
  @Response(200, 'Success')
  @Post('refresh')
  public async refresh(@Request() request: express.Request): Promise<boolean> {
    if (request && request.cookies && (request.cookies.refreshToken in refreshTokenList)) {
      const refreshToken = this.authorization.decodeToken(request.cookies.refreshToken);

      if (!this.authorization.validateToken(refreshToken)) {
        log.debug('REFRESH TOKEN EXPIRED ' + moment.unix(refreshToken.exp).format('dd HH:mm:ss'));
        throw new ApiError(401, 'Unauthorized');
      }

      const user: IUser = await this.userService.findById(refreshToken.user);
      const newAuthToken = this.authorization.createAuthToken(user);

      this.setCookies({
        token: {
          value: newAuthToken,
          options: {
            httpOnly: true
          }
        }
      });
    } else {
      log.debug('REFRESH TOKEN NOT IN LIST');
      throw new ApiError(401, 'Unauthorized');
    }
    return true;
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

  private setCookies(cookies) {
    this.cookies = cookies;
  }

  private getCookies() {
    const cookies = JSON.parse(JSON.stringify(this.cookies));
    this.cookies = {};
    return cookies;
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
