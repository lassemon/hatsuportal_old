import Ajax from "utils/Ajax";

const ajax = new Ajax();

const tagsApi = {
  getAll: (): Promise<void> => {
    return ajax.get({
      endpoint: 'v1/tags'
    });
  }
};

export default tagsApi;