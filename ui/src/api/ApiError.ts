export default class ApiError extends Error {

  public status: number;
  public statusText: string;
  public response: string | undefined;
  public message: string;

  constructor(status: number, statusText: string, response?: string) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.response = response;
    this.message = `${status} - ${statusText}`;
  }
}
