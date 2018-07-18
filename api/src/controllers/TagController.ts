import TagService from 'services/TagService';
import { Controller, Example, Get, Response, Route, SuccessResponse, Tags } from 'tsoa';
import Logger from 'utils/Logger';

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
  public async getAll(): Promise<any[]> {
    return this.tagService.getAll();
  }

  @Tags('tags')
  @Get('{id}')
  @Response(404, 'Not Found')
  @SuccessResponse(200, 'Ok')
  public async get(id: number): Promise<any> {
    return this.tagService.findById(id);
  }

  public setService(service: TagService) {
    this.tagService = service;
  }
}
