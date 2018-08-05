import 'jest';
import { instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import ApiError from '../../src/errors/ApiError';
import { IDBUser, IUser } from '../../src/interfaces/user';
import UserModel from '../../src/models/UserModel';
import UserService from '../../src/services/UserService';

describe('UserService', () => {

  let userService: UserService;
  let userModel: UserModel;

  const DB_TEST_USER_RESPONSE: IDBUser[] = [
    { id: 123, name: 'test', password: 'test', email: 'test', created: new Date() },
    { id: 456, name: 'test2', password: 'test', email: 'test2', created: new Date() }
  ];

  const TEST_ERROR_MESSAGE = new ApiError('UserNotFound', 404, 'User not found');

  beforeEach(() => {
    userService = new UserService();
    userModel = mock(UserModel);
  });

  it('should return a list of users', async () => {
    expect.assertions(1);
    when(userModel.getAll()).thenReturn(Promise.resolve(DB_TEST_USER_RESPONSE));
    userService.setModel(instance(userModel));

    await expect(userService.getAll()).resolves.toEqual(DB_TEST_USER_RESPONSE);
  });

  it('should return a user by id', async () => {
    expect.assertions(1);
    when(userModel.findById(123)).thenReturn(Promise.resolve(DB_TEST_USER_RESPONSE));
    userService.setModel(instance(userModel));

    await expect(userService.findById(123)).resolves.toEqual(DB_TEST_USER_RESPONSE[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable no-empty */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable no-empty */
    when(userModel.findById(456)).thenReturn(rejectPromise);
    userService.setModel(instance(userModel));

    try {
      const result = await userService.findById(456);
    } catch (error) {
      expect(error.getName()).toEqual('UserNotFound');
      expect(error.getStatus()).toEqual(404);
    }
  });

});
