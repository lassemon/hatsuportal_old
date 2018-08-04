import ItemService from 'services/ItemService';
import TagService from 'services/TagService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { IItem } from '../interfaces/item';
import { IItemInsertRequest, IItemUpdateRequest } from '../interfaces/requests';

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
  public async getAll(): Promise<IItem[]> {
    log.debug('getting all items');
    return this.itemService.getAll();
  }

  @Tags('items')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<IItem> {
    log.debug('getting item with id: ' + id);
    return this.itemService.findById(id);
  }

  @Tags('items')
  @Post()
  @Response(400, 'Bad Request')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: IItemInsertRequest): Promise<IItem> {
    log.debug('inserting item: ' + JSON.stringify(request));
    return await this.itemService.insert(request);
  }

  @Tags('items')
  @Put()
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: IItemUpdateRequest): Promise<IItem> {
    log.debug('updating item with id: ' + request.id);
    return this.itemService.update(request);
  }

  @Tags('items')
  @Delete('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<boolean> {
    log.debug('removing item with id: ' + id);
    return this.itemService.remove(id);
  }

  public setService(service: ItemService) {
    this.itemService = service;
  }
}
