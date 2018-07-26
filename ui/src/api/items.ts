import axios, { AxiosResponse } from 'axios';

const itemsApi = {
  getItems: (): Promise<void> => {
    return axios.get('/api/v1/items')
      .then((response: AxiosResponse) => {
        console.log(response);
        return response.data;
      })
      .catch((error: string) => {
        console.log(error);
      });
  } 
};

export default itemsApi;