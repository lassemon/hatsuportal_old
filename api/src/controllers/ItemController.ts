import ItemService from 'services/ItemService';
import TagService from 'services/TagService';
import { Body, Controller, Get, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { Item, ItemCreateRequest, ItemInsert } from '../interfaces/item';

const log = new Logger('ItemController');

@Route('v1/items')
export class ItemController extends Controller {

  private itemService: ItemService;
  private tagService: TagService;

  constructor() {
    super();
    this.itemService = new ItemService();
    this.tagService = new TagService();
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

  @Tags('items')
  @Post()
  @Response(400, 'Bad Request')
  @SuccessResponse(200, 'Ok')
  public async add(@Body() request: ItemCreateRequest): Promise<Item> {
    log.debug('inserting item: ' + JSON. stringify(request));
    return await this.itemService.insert(request);
  }

  public setService(service: ItemService) {
    this.itemService = service;
  }
}
