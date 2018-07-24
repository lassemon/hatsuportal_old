import TagService from 'services/TagService';
import { Body, Controller, Delete, Get, Post, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';
import { Tag, TagCreateRequest, TagInsert } from '../interfaces/tag';

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
  public async getAll(): Promise<Tag[] > {
    log.debug('getting all tags');
    return this.tagService.getAll();
  }

  @Tags('tags')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<Tag> {
    log.debug('getting tag with id: ' + id);
    return this.tagService.findById(id);
  }

  @Tags('tags')
  @Post()
  @Response(400, 'Bad Request')
  @Response(409, 'Conflict')
  @SuccessResponse(200, 'Ok')
  public async add(@Body() request: TagCreateRequest): Promise<Tag> {
    log.debug('inserting tag: ' + JSON.stringify(request));
    return this.tagService.insert(request as TagInsert);
  }

  @Tags('tags')
  @Delete('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async delete(id: number): Promise<boolean> {
    log.debug('removing tag with id: ' + id);
    return this.tagService.remove(id);
  }

  @Tags('tags')
  @Put()
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async put(@Body() request: Tag): Promise<Tag> {
    log.debug('updating tag with id: ' + request.id + ' to ' + request.name);
    return this.tagService.update(request);
  }

  public setService(service: TagService) {
    this.tagService = service;
  }
}
