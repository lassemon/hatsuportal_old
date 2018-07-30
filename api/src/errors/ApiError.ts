/**
 * @tsoaModel
 */
export default class ApiError extends Error {
  private statusCode: number;
  constructor(name: string, statusCode: number, message?: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getName(): string {
    return this.name;
  }

  public getStatus(): number {
    return this.statusCode;
  }
}
