import { Controller, Example, Get, Route, Tags } from 'tsoa';
import Logger from 'utils/logger';

const log = new Logger('PingController');

@Route('v1/ping')
export class PingController extends Controller {

  @Get()
  @Tags('test')
  public async ping(): Promise<string> {
    log.info('Responding to Ping...');
    return 'Pong!';
  }
}
