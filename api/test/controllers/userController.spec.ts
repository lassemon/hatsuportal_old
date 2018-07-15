import 'jest';
import {instance, mock, when} from 'ts-mockito-2/lib/ts-mockito';
import { UserController } from '../../src/controllers/userController';
import { User } from '../../src/interfaces/user';
import UserService from '../../src/models/userService';

describe('UserController', () => {

  let userService: UserService;
  const controller = new UserController();

  const TEST_USER_LIST: User[] = [
    {id: 123, name: 'test', email: 'test', created: new Date()},
    {id: 456, name: 'test2', email: 'test2', created: new Date()}
  ];

  const TEST_EMPTY_RESPONSE: User[] = [];

  const TEST_ERROR_MESSAGE = 'test error';

  beforeEach(() => {
    userService = mock(UserService);
    when(userService.getAll()).thenReturn(Promise.resolve(TEST_USER_LIST));
    when(userService.findById(123)).thenReturn(Promise.resolve(TEST_USER_LIST[0]));
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    rejectPromise.catch(() => {}); // to suppress UnhandledPromiseRejectionWarning
    when(userService.findById(456)).thenReturn(rejectPromise);
    when(userService.findById(777)).thenReturn(Promise.resolve(TEST_EMPTY_RESPONSE[0]));
    controller.setService(instance(userService));
  });

  test('should return a list of users', () => {
    controller.getAll().then((data) => expect(data).toEqual(TEST_USER_LIST));
  });

  test('should return a user by id', () => {
    controller.get(123).then((data) => expect(data).toEqual(TEST_USER_LIST[0]));
  });

  test('should fail', () => {
    controller.get(456).then((data) => {
      fail();
    }).catch((error) => {
      expect(error).toEqual(TEST_ERROR_MESSAGE);
    });
  });

  test('should return a 404 response', () => {
    controller.get(777).then((data) => {
      expect(controller.getStatus()).toEqual(404);
      expect(data).toEqual(TEST_EMPTY_RESPONSE[0]);
    });
  });

});
