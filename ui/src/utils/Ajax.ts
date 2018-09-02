/*tslint:disable no-any*/
import ApiError from 'api/ApiError';
import RefreshTokenError from 'api/RefreshTokenError';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from 'config';

export interface IAjaxOptions {
  payload?: any;
  endpoint: string;
  querystring?: string;
  noRefresh?: boolean;
}

export default class Ajax {

  public get = async (options: IAjaxOptions): Promise<any> => {
    const url = this.buildQueryUrl(options);
    return axios.get(url)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch(async (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401 && !options.noRefresh) {
            await this.refreshToken();
            return this.retryOperation(axios.get, url, options)
              .then((response: AxiosResponse) => {
                return response.data;
              })
              .catch((retryError: AxiosError) => {
                if (retryError.response) {
                  throw new ApiError(retryError.response.status, retryError.response.statusText);
                } else {
                  throw new ApiError(400, 'BadRequest');
                }
              });
          }
          throw new ApiError(error.response.status, error.response.statusText);
        } else {
          throw new ApiError(400, 'BadRequest');
        }
      });
  }

  public post = async (options: IAjaxOptions): Promise<any> => {
    const url = this.buildQueryUrl(options);
    return axios.post(url, options.payload)
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch(async (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401 && !options.noRefresh) {
            await this.refreshToken();
            return this.retryOperation(axios.post, url, options)
              .then((response: AxiosResponse) => {
                return response.data;
              })
              .catch((retryError: AxiosError) => {
                if (retryError.response) {
                  throw new ApiError(retryError.response.status, retryError.response.statusText);
                } else {
                  throw new ApiError(400, 'BadRequest');
                }
              });
          }
          throw new ApiError(error.response.status, error.response.statusText);
        } else {
          throw new ApiError(400, 'BadRequest');
        }
      });
  }

  public put = async (options: IAjaxOptions): Promise<any> => {
    const url = this.buildQueryUrl(options);
    return axios.put(url, options.payload)
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch(async (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401 && !options.noRefresh) {
            await this.refreshToken();
            return this.retryOperation(axios.put, url, options)
              .then((response: AxiosResponse) => {
                return response.data;
              })
              .catch((retryError: AxiosError) => {
                if (retryError.response) {
                  throw new ApiError(retryError.response.status, retryError.response.statusText);
                } else {
                  throw new ApiError(400, 'BadRequest');
                }
              });
          }
          throw new ApiError(error.response.status, error.response.statusText);
        } else {
          throw new ApiError(400, 'BadRequest');
        }
      });
  }

  public delete = async (options: IAjaxOptions): Promise<any> => {
    const url = this.buildQueryUrl(options);
    return axios.delete(url, options.payload)
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch(async (error: AxiosError) => {
        if (error.response) {
          if (error.response.status === 401 && !options.noRefresh) {
            await this.refreshToken();
            return this.retryOperation(axios.delete, url, options)
              .then((response: AxiosResponse) => {
                return response.data;
              })
              .catch((retryError: AxiosError) => {
                if (retryError.response) {
                  throw new ApiError(retryError.response.status, retryError.response.statusText);
                } else {
                  throw new ApiError(400, 'BadRequest');
                }
              });
          }
          throw new ApiError(error.response.status, error.response.statusText);
        } else {
          throw new ApiError(400, 'BadRequest');
        }
      });
  }

  private buildQueryUrl = (options: IAjaxOptions) => {
    return `${config.API_ROOT}${options.endpoint}${options.querystring ? '?' + options.querystring : ''}`;
  }

  private refreshToken = async (): Promise<any> => {
    const url = this.buildQueryUrl({
      endpoint: 'v1/users/refresh'
    });
    return axios.post(url)
      .then((response: AxiosResponse) => {
        return response.data;
      }).catch(() => {
        throw new RefreshTokenError(401, 'Unauthorized');
      });
  }

  private retryOperation = (operation: (url: string, payload?: any) => Promise<AxiosResponse>, url: string, options: IAjaxOptions) => {
    return operation(url, options.payload ? options.payload : undefined);
  }
}
/*tslint:enable no-any*/