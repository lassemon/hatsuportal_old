import 'jest';
import { instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import ApiError from '../../src/errors/ApiError';
import { IDBTag, ITag } from '../../src/interfaces/tag';
import TagModel from '../../src/models/TagModel';
import TagService from '../../src/services/TagService';

describe('TagService', () => {

  let tagService: TagService;
  let tagModel: TagModel;

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
    tagService = new TagService();
    tagModel = mock(TagModel);
  });

  it('should return a list of tags', async () => {
    expect.assertions(1);
    when(tagModel.getAll()).thenReturn(Promise.resolve(DB_TEST_TAG_LIST));
    tagService.setModel(instance(tagModel));

    await expect(tagService.getAll()).resolves.toEqual(MAPPED_TEST_TAG_LIST);
  });

  it('should return a tag by id', async () => {
    expect.assertions(1);
    when(tagModel.findById(MAPPED_TEST_TAG_LIST[0].id)).thenReturn(Promise.resolve(DB_TEST_TAG_LIST[0]));
    tagService.setModel(instance(tagModel));

    await expect(tagService.findById(MAPPED_TEST_TAG_LIST[0].id)).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable no-empty */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable no-empty */
    when(tagModel.findById(MAPPED_TEST_TAG_LIST[1].id)).thenReturn(rejectPromise);
    tagService.setModel(instance(tagModel));

    try {
      const result = await tagService.findById(MAPPED_TEST_TAG_LIST[1].id);
    } catch (error) {
      expect(error.getName()).toEqual('TagNotFound');
      expect(error.getStatus()).toEqual(404);
    }
  });

  it('should add a tag', async () => {
    expect.assertions(1);
    when(tagModel.getAll()).thenReturn(Promise.resolve([]));
    when(tagModel.insert(MAPPED_TEST_TAG_LIST[0])).thenReturn(Promise.resolve(DB_TEST_TAG_LIST));
    tagService.setModel(instance(tagModel));

    await expect(tagService.insert(MAPPED_TEST_TAG_LIST[0])).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

  it('should delete a tag', async () => {
    expect.assertions(1);
    when(tagModel.remove(MAPPED_TEST_TAG_LIST[0].id)).thenReturn(Promise.resolve(true));
    tagService.setModel(instance(tagModel));

    await expect(tagService.remove(MAPPED_TEST_TAG_LIST[0].id)).resolves.toEqual(true);
  });

  it('should update a tag', async () => {
    expect.assertions(1);
    when(tagModel.update(MAPPED_TEST_TAG_LIST[0])).thenReturn(Promise.resolve(DB_TEST_TAG_LIST[0]));
    tagService.setModel(instance(tagModel));

    await expect(tagService.update(MAPPED_TEST_TAG_LIST[0])).resolves.toEqual(MAPPED_TEST_TAG_LIST[0]);
  });

});
