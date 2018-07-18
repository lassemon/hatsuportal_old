import 'jest';
import {instance, mock, when} from 'ts-mockito-2/lib/ts-mockito';
import { TagController } from '../../src/controllers/TagController';
import ApiError from '../../src/errors/ApiError';
import { Tag } from '../../src/interfaces/tag';
import TagService from '../../src/services/TagService';

describe('UserController', () => {

  let tagService: TagService;
  const controller: TagController = new TagController();

  const TEST_TAG_LIST: Tag[] = [
    {
      id: 22,
      name: 'resepti'
    },
    {
      id: 33,
      name: 'musiikki'
    }
  ];

  const TEST_ERROR_MESSAGE = new ApiError('TagNotFound', 404, 'Tag not found');

  beforeEach(() => {
    tagService = mock(TagService);
  });

  it('should return a list of tags', async () => {
    expect.assertions(1);
    when(tagService.getAll()).thenReturn(Promise.resolve(TEST_TAG_LIST));
    controller.setService(instance(tagService));

    await expect(controller.getAll()).resolves.toBe(TEST_TAG_LIST);
  });

  it('should return an tag by id', async () => {
    expect.assertions(1);
    when(tagService.findById(123)).thenReturn(Promise.resolve(TEST_TAG_LIST[0]));
    controller.setService(instance(tagService));

    await expect(controller.get(123)).resolves.toBe(TEST_TAG_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    rejectPromise.catch(() => {}); // to suppress UnhandledPromiseRejectionWarning
    when(tagService.findById(456)).thenReturn(rejectPromise);
    controller.setService(instance(tagService));

    try {
      const result = await controller.get(456);
    } catch (error) {
      expect(error.getMessage()).toBe('Tag not found');
      expect(error.getStatus()).toBe(404);
    }
  });

});
