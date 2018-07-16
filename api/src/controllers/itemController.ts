import ItemService from 'services/ItemService';
import { Controller, Example, Get, Route, Tags } from 'tsoa';
import Logger from 'utils/logger';

const log = new Logger('ItemController');
const service = new ItemService();

@Route('v1/items')
export class ItemController extends Controller {

  @Get()
  @Tags('items')
  public async users(): Promise<string> {
    return service.getItems();
  }
}
