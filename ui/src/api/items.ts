import { IItemUpdateRequest } from 'types';
import Ajax from 'utils/Ajax';

const ajax = new Ajax();

const itemsApi = {
  getAll: (): Promise<void> => {
    return ajax.get({
      endpoint: 'v1/items'
    });
  },
  get: (itemId: number): Promise<void> => {
    return ajax.get({
      endpoint: 'v1/items/' + itemId
    });
  },
  update: (payload: IItemUpdateRequest): Promise<void> => {
    return ajax.put({
      payload,
      endpoint: 'v1/items/'
    });
  }
};

export default itemsApi;