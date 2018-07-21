import ItemService from 'services/ItemService';
import { Controller, Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { Item } from '../interfaces/item';

const log = new Logger('ItemController');

@Route('v1/items')
export class ItemController extends Controller {

  private itemService: ItemService;

  constructor() {
    super();
    this.itemService = new ItemService();
  }

  @Tags('items')
  @Get()
  public async getAll(): Promise<Item[]> {
    log.debug('getting all items');
    return this.itemService.getAll();
  }

  @Tags('items')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<Item> {
    log.debug('getting item with id: ' + id);
    return this.itemService.findById(id);
  }

  public setService(service: ItemService) {
    this.itemService = service;
  }
}
