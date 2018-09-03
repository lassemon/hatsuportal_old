import { ILoginRequest } from 'types';
import Ajax from 'utils/Ajax';

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
  status: (): Promise<void> => {
    return ajax.get({
      endpoint: 'v1/status'
    });
  }
};

export default authApi;