import * as _ from 'lodash';
import UserService from 'models/userService';
import { Controller, Example, Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/logger';
import SerializerService from 'utils/serializerService';

const log = new Logger('UserController');

@Route('v1/users')
export class UserController extends Controller {

  private userService: UserService;
  private serializerService: SerializerService;

  constructor() {
    super();
    this.userService = new UserService();
    this.serializerService = new SerializerService();
  }

  @Tags('user')
  @Get()
  public async getAll(): Promise<any[]> {
    return this.userService.getAll();
  }

  @Tags('user')
  @Get('{id}')
  @Response('404', 'Not Found')
  @SuccessResponse('200', 'Ok')
  public async get(id: number): Promise<any> {
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
