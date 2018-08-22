import 'jest';
import { instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import { UserController } from '../../src/controllers/UserController';
import ApiError from '../../src/errors/ApiError';
import { IUserResponse } from '../../src/interfaces/responses';
import { IDBUser, IUser } from '../../src/interfaces/user';
import UserModel from '../../src/models/UserModel';
import UserService from '../../src/services/UserService';

describe('UserController', () => {

  let userService: UserService;
  const controller: UserController = new UserController();

  const DB_TEST_USER_RESPONSE: IDBUser[] = [
    { id: 123, name: 'test', password: 'test', email: 'test', created: new Date() },
    { id: 456, name: 'test2', password: 'test', email: 'test2', created: new Date() }
  ];

  const MAPPED_TEST_USER_LIST: IUserResponse[] = DB_TEST_USER_RESPONSE.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created: user.created
  }));

  const TEST_ERROR_MESSAGE = new ApiError(404, 'UserNotFound', 'User not found');

  beforeEach(() => {
    userService = mock(UserService);
  });

  it('should return a list of users', async () => {
    expect.assertions(1);
    when(userService.getAll()).thenReturn(Promise.resolve(DB_TEST_USER_RESPONSE));
    controller.setService(instance(userService));

    await expect(controller.getAll()).resolves.toEqual(MAPPED_TEST_USER_LIST);
  });

  it('should return a user by id', async () => {
    expect.assertions(1);
    when(userService.findById(123)).thenReturn(Promise.resolve(DB_TEST_USER_RESPONSE[0]));
    controller.setService(instance(userService));

    await expect(controller.get(123)).resolves.toEqual(MAPPED_TEST_USER_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable no-empty */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable no-empty */
    when(userService.findById(456)).thenReturn(rejectPromise);
    controller.setService(instance(userService));

    try {
      const result = await controller.get(456);
    } catch (error) {
      expect(error.statusText).toEqual('UserNotFound');
      expect(error.status).toEqual(404);
    }
  });

});
