import { IItemInsertRequest, IItemUpdateRequest } from 'types';
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
  insert: (payload: IItemInsertRequest): Promise<void> => {
    return ajax.post({
      payload,
      endpoint: 'v1/items/'
    });
  },
  update: (payload: IItemUpdateRequest): Promise<void> => {
    return ajax.put({
      payload,
      endpoint: 'v1/items/'
    });
  },
  delete: (itemId: number): Promise<void> => {
    return ajax.delete({
      endpoint: 'v1/items/' + itemId
    });
  }
};

export default itemsApi;