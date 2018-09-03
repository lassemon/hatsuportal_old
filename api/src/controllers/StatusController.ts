import { Controller, Get, Route, Security, Tags } from 'tsoa';

@Route('v1/status')
export class StatusController extends Controller {

  @Get()
  @Tags('status')
  @Security('jwt')
  public async status(): Promise<boolean> {
    return true;
  }
}
