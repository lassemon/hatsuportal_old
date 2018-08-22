import { ILoginRequest } from 'types';
import Ajax from 'utils/Ajax';
// import RefreshTokenError from './RefreshTokenError';

const ajax = new Ajax();

const authApi = {
  login: (payload: ILoginRequest): Promise<void> => {
    return ajax.post({
      payload,
      endpoint: 'v1/users/login',
      noRefresh: true
    });
  },
  logout: (): Promise<void> => {
    return ajax.post({
      endpoint: 'v1/users/logout'
    });
  },
  refreshToken: (): Promise<void> => {
    return ajax.post({
      endpoint: 'v1/users/refresh',
      noRefresh: true
    });
  }
};

export default authApi;