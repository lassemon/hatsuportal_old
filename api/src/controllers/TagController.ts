import TagService from 'services/TagService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { ITag, ITagInsertRequest, ITagUpdateRequest } from '../interfaces/tag';

const log = new Logger('TagController');

@Route('v1/tags')
export class TagController extends Controller {

  private tagService: TagService;

  constructor() {
    super();
    this.tagService = new TagService();
  }

  @Tags('tags')
  @Get()
  public async getAll(): Promise<ITag[]> {
    log.debug('getting all tags');
    return this.tagService.getAll();
  }

  @Tags('tags')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<ITag> {
    log.debug('getting tag with id: ' + id);
    return this.tagService.findById(id);
  }

  @Tags('tags')
  @Post()
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  @SuccessResponse(200, 'Ok')
  public async insert(@Body() request: ITagInsertRequest): Promise<ITag> {
    log.debug('inserting tag: ' + JSON.stringify(request));
    return this.tagService.insert(request);
  }

  @Tags('tags')
  @Put()
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: ITagUpdateRequest): Promise<ITag> {
    log.debug('updating tag with id: ' + request.id + ' to ' + request.name);
    return this.tagService.update(request);
  }

  @Tags('tags')
  @Delete('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<boolean> {
    log.debug('removing tag with id: ' + id);
    return this.tagService.remove(id);
  }

  public setService(service: TagService) {
    this.tagService = service;
  }
}
