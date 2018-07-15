import { UserController } from 'controllers/userController';
import UserService from 'models/userService';
import {instance, mock, when} from 'ts-mockito-2';

describe('UserController', () => {

  let userService: UserService;
  const controller = new UserController();

  const TEST_USER_LIST = [
    {id: 123},
    {id: 456}
  ];

  const TEST_EMPTY_RESPONSE = [];

  const TEST_ERROR_MESSAGE = 'test error';

  beforeEach(() => {
    userService = mock(UserService);
    when(userService.getAll()).thenReturn(Promise.resolve(TEST_USER_LIST));
    when(userService.findById(123)).thenReturn(Promise.resolve(TEST_USER_LIST[0]));
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    rejectPromise.catch(() => {}); // to suppress UnhandledPromiseRejectionWarning
    when(userService.findById(456)).thenReturn(rejectPromise);
    when(userService.findById(777)).thenReturn(Promise.resolve(TEST_EMPTY_RESPONSE));
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
      expect(data).toEqual(TEST_EMPTY_RESPONSE);
    });
  });

});
