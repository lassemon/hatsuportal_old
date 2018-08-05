import 'jest';
import { anyString, instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import { TagController } from '../../src/controllers/TagController';
import ApiError from '../../src/errors/ApiError';
import { IDBTag, ITag } from '../../src/interfaces/tag';
import TagService from '../../src/services/TagService';

describe('TagController', () => {

  let tagService: TagService;
  const controller: TagController = new TagController();

  const DB_TEST_TAG_LIST: IDBTag[] = [
    { id: 22, name: 'resepti' },
    { id: 33, name: 'musiikki' }
  ];

  const MAPPED_TEST_TAG_LIST: ITag[] = [
    { id: 22, name: 'resepti' },
    { id: 33, name: 'musiikki' }
  ];

  const TEST_ERROR_MESSAGE = new ApiError('TagNotFound', 404, 'Tag not found');

  beforeEach(() => {
    tagService = mock(TagService);
    when(tagService.tagExists(anyString())).thenReturn(Promise.resolve(false));
  });

  it('should return a list of tags', async () => {
    expect.assertions(1);
    when(tagService.getAll()).thenReturn(Promise.resolve(DB_TEST_TAG_LIST));
    controller.setService(instance(tagService));

    await expect(controller.getAll()).resolves.toEqual(MAPPED_TEST_TAG_LIST);
  });

  it('should return a tag by id', async () => {
    expect.assertions(1);
    when(tagService.findById(MAPPED_TEST_TAG_LIST[0].id)).thenReturn(Promise.resolve(DB_TEST_TAG_LIST[0]));
    controller.setService(instance(tagService));

    await expect(controller.get(MAPPED_TEST_TAG_LIST[0].id)).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable no-empty */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable no-empty */
    when(tagService.findById(MAPPED_TEST_TAG_LIST[1].id)).thenReturn(rejectPromise);
    controller.setService(instance(tagService));

    try {
      const result = await controller.get(MAPPED_TEST_TAG_LIST[1].id);
    } catch (error) {
      expect(error.getName()).toEqual('TagNotFound');
      expect(error.getStatus()).toEqual(404);
    }
  });

  it('should add a tag', async () => {
    expect.assertions(1);
    when(tagService.insert(MAPPED_TEST_TAG_LIST[0])).thenReturn(Promise.resolve(DB_TEST_TAG_LIST[0]));
    controller.setService(instance(tagService));

    await expect(controller.insert(MAPPED_TEST_TAG_LIST[0])).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

  it('should delete a tag', async () => {
    expect.assertions(1);
    when(tagService.remove(MAPPED_TEST_TAG_LIST[0].id)).thenReturn(Promise.resolve(true));
    controller.setService(instance(tagService));

    await expect(controller.delete(MAPPED_TEST_TAG_LIST[0].id)).resolves.toEqual(true);
  });

  it('should update a tag', async () => {
    expect.assertions(1);
    when(tagService.update(MAPPED_TEST_TAG_LIST[0])).thenReturn(Promise.resolve(DB_TEST_TAG_LIST[0]));
    controller.setService(instance(tagService));

    await expect(controller.put(MAPPED_TEST_TAG_LIST[0])).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

});
