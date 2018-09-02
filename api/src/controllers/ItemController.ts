import ItemMapper from 'mappers/ItemMapper';
import ItemService from 'services/ItemService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { IItemInsertRequest, IItemUpdateRequest } from '../interfaces/requests';
import { IItemResponse } from '../interfaces/responses';

const log = new Logger('ItemController');

@Route('v1/items')
export class ItemController extends Controller {

  private itemService: ItemService;
  private itemMapper: ItemMapper;

  constructor() {
    super();
    this.itemService = new ItemService();
    this.itemMapper = new ItemMapper();
  }

  @Tags('items')
  @Response(404, 'Not Found')
  @Get()
  public async getAll(): Promise<IItemResponse[]> {
    log.debug('getting all items');
    return this.itemMapper.mapAllToResponse(await this.itemService.getAll());
  }

  @Tags('items')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<IItemResponse> {
    log.debug('getting item with id: ' + id);
    return this.itemMapper.mapToResponse(await this.itemService.findById(id));
  }

  @Tags('items')
  @Post()
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(400, 'Bad Request')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: IItemInsertRequest): Promise<IItemResponse> {
    log.debug('inserting item: ' + JSON.stringify(request));
    return await this.itemMapper.mapToResponse(await this.itemService.insert(request));
  }

  @Tags('items')
  @Put()
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: IItemUpdateRequest): Promise<IItemResponse> {
    log.debug('updating item: ' + JSON.stringify(request));
    return this.itemMapper.mapToResponse(await this.itemService.update(request));
  }

  @Tags('items')
  @Delete('{id}')
  @Security('jwt')
  @Response(401, 'Unauthorized')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<IItemResponse> {
    log.debug('removing item with id: ' + id);
    return this.itemMapper.mapToResponse(await this.itemService.remove(id));
  }

  public setService(service: ItemService) {
    this.itemService = service;
  }
}
