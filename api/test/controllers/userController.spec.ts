import 'jest';
import {instance, mock, when} from 'ts-mockito-2/lib/ts-mockito';
import { UserController } from '../../src/controllers/UserController';
import ApiError from '../../src/errors/ApiError';
import { User } from '../../src/interfaces/user';
import UserService from '../../src/services/UserService';

describe('UserController', () => {

  let userService: UserService;
  const controller: UserController = new UserController();

  const TEST_USER_LIST: User[] = [
    {id: 123, name: 'test', email: 'test', created: new Date()},
    {id: 456, name: 'test2', email: 'test2', created: new Date()}
  ];

  const TEST_ERROR_MESSAGE = new ApiError('UserNotFound', 404, 'User not found');

  beforeEach(() => {
    userService = mock(UserService);
  });

  it('should return a list of users', async () => {
    expect.assertions(1);
    when(userService.getAll()).thenReturn(Promise.resolve(TEST_USER_LIST));
    controller.setService(instance(userService));

    await expect(controller.getAll()).resolves.toBe(TEST_USER_LIST);
  });

  it('should return a user by id', async () => {
    expect.assertions(1);
    when(userService.findById(123)).thenReturn(Promise.resolve(TEST_USER_LIST[0]));
    controller.setService(instance(userService));

    await expect(controller.get(123)).resolves.toBe(TEST_USER_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    rejectPromise.catch(() => {}); // to suppress UnhandledPromiseRejectionWarning
    when(userService.findById(456)).thenReturn(rejectPromise);
    controller.setService(instance(userService));

    try {
      const result = await controller.get(456);
    } catch (error) {
      expect(error.getMessage()).toBe('User not found');
      expect(error.getStatus()).toBe(404);
    }
  });

});
