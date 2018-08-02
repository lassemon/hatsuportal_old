import axios, { AxiosResponse } from 'axios';

const itemsApi = {
  getAll: (): Promise<void> => {
    return axios.get('/api/v1/items')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: string) => {
        throw new Error(error);
      });
  }
};

export default itemsApi;