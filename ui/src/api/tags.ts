import axios, { AxiosResponse } from 'axios';

const tagsApi = {
  getAll: (): Promise<void> => {
    return axios.get('/api/v1/tags')
      .then((response: AxiosResponse) => {
        console.log(response);
        return response.data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  }
};

export default tagsApi;