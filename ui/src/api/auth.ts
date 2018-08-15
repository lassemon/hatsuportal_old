import axios, { AxiosResponse } from 'axios';
import { ILoginRequest } from 'types';

const authApi = {
  login: (payload: ILoginRequest): Promise<void> => {
    return axios.post('/api/v1/users/login', payload).then((response: AxiosResponse) => {
      return response.data;
    }).catch((error: string) => {
      throw new Error(error);
    });
  },
  logout: (): Promise<void> => {
    return axios.post('/api/v1/users/logout')
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch((error: string) => {
        throw new Error(error);
      });
  }
};

export default authApi;