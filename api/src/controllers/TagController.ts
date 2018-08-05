import TagMapper from 'mappers/TagMapper';
import TagService from 'services/TagService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { ITagInsertRequest, ITagUpdateRequest } from '../interfaces/requests';
import { ITagResponse } from '../interfaces/responses';

const log = new Logger('TagController');

@Route('v1/tags')
export class TagController extends Controller {

  private tagService: TagService;
  private tagMapper: TagMapper;

  constructor() {
    super();
    this.tagService = new TagService();
    this.tagMapper = new TagMapper();
  }

  @Tags('tags')
  @Get()
  public async getAll(): Promise<ITagResponse[]> {
    log.debug('getting all tags');
    return this.tagMapper.mapAll(await this.tagService.getAll());
  }

  @Tags('tags')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<ITagResponse> {
    log.debug('getting tag with id: ' + id);
    return this.tagMapper.map(await this.tagService.findById(id));
  }

  @Tags('tags')
  @Post()
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: ITagInsertRequest): Promise<ITagResponse> {
    log.debug('inserting tag: ' + JSON.stringify(request));
    return this.tagMapper.map(await this.tagService.insert(request));
  }

  @Tags('tags')
  @Put()
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: ITagUpdateRequest): Promise<ITagResponse> {
    log.debug('updating tag with id: ' + request.id + ' to ' + request.name);
    return this.tagMapper.map(await this.tagService.update(request));
  }

  @Tags('tags')
  @Delete('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<boolean> {
    log.debug('removing tag with id: ' + id);
    return await this.tagService.remove(id);
  }

  public setService(service: TagService) {
    this.tagService = service;
  }
}
