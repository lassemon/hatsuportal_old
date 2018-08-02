import axios, { AxiosResponse } from 'axios';

const tagsApi = {
  getAll: (): Promise<void> => {
    return axios.get('/api/v1/tags')
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: string) => {
        throw new Error(error);
      });
  }
};

export default tagsApi;