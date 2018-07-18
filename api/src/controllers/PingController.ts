import { Controller, Example, Get, Route, Tags } from 'tsoa';

@Route('v1/ping')
export class PingController extends Controller {

  @Get()
  @Tags('test')
  public async ping(): Promise<string> {
    return 'Pong!';
  }
}
