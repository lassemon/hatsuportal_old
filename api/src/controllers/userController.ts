import * as Knex from 'knex';
import * as _ from 'lodash';
import UserService from 'models/userService';
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
  public getAll(): Promise<any> {
    return this.userService.getAll();
  }

  @Tags('user')
  @Get('{id}')
  @Response('404', 'Not Found')
  @SuccessResponse('200', 'Ok')
  public get(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.findById(id).then((result) => {
        if (!result || _.isEmpty(result)) {
          this.setStatus(404);
        }
        resolve(result);
      }).catch(error => {
        this.setStatus(404);
        reject(error);
      });
    });
  }

  public setService(service: UserService) {
    this.userService = service;
  }
}
