import Ajax from 'utils/Ajax';

const ajax = new Ajax();

const itemsApi = {
  getAll: (): Promise<void> => {
    return ajax.get({
      endpoint: 'v1/items'
    });
  }
};

export default itemsApi;