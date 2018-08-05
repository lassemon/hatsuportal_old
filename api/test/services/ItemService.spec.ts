import 'jest';
import { anyNumber, anything, instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import ApiError from '../../src/errors/ApiError';
import { IDBItem, IItem } from '../../src/interfaces/item';
import { IItemInsertRequest } from '../../src/interfaces/requests';
import ItemModel from '../../src/models/ItemModel';
import ItemService from '../../src/services/ItemService';
import TagService from '../../src/services/TagService';

describe('ItemService', () => {

  let itemService: ItemService;
  let tagService: TagService;
  let itemModel: ItemModel;

  const TEST_ITEMS_DB_RESULT: IDBItem[] = [
    {
      id: 123,
      type: 'article',
      title: 'Jykän paras resepti',
      description: 'Tällä pääsee hekumaan',
      content: 'test',
      created: new Date(),
      modified: new Date(),
      author_id: 69,
      author_name: 'jykajee'
    },
    {
      id: 420,
      type: 'video',
      title: 'Hyvä biisi',
      description: 'Kato loppuun asti',
      content: 'https://www.youtube.com/watch?v=N9cml2D8VU0',
      created: new Date(),
      modified: new Date(),
      author_id: 78,
      author_name: 'Mister Thane'
    }
  ];

  const TEST_ITEM_LIST: IItem[] = [
    {
      id: TEST_ITEMS_DB_RESULT[0].id,
      type: TEST_ITEMS_DB_RESULT[0].type,
      title: TEST_ITEMS_DB_RESULT[0].title,
      description: TEST_ITEMS_DB_RESULT[0].description,
      content: TEST_ITEMS_DB_RESULT[0].content,
      created: TEST_ITEMS_DB_RESULT[0].created,
      modified: TEST_ITEMS_DB_RESULT[0].modified,
      authorId: TEST_ITEMS_DB_RESULT[0].author_id,
      authorName: TEST_ITEMS_DB_RESULT[0].author_name,
      tags: []
    },
    {
      id: TEST_ITEMS_DB_RESULT[1].id,
      type: TEST_ITEMS_DB_RESULT[1].type,
      title: TEST_ITEMS_DB_RESULT[1].title,
      description: TEST_ITEMS_DB_RESULT[1].description,
      content: TEST_ITEMS_DB_RESULT[1].content,
      created: TEST_ITEMS_DB_RESULT[1].created,
      modified: TEST_ITEMS_DB_RESULT[1].modified,
      authorId: TEST_ITEMS_DB_RESULT[1].author_id,
      authorName: TEST_ITEMS_DB_RESULT[1].author_name,
      tags: []
    }
  ];

  const ITEM_IMSERT_TEST_REQUEST: IItemInsertRequest = {
    type: TEST_ITEM_LIST[0].type,
    title: TEST_ITEM_LIST[0].title,
    description: TEST_ITEM_LIST[0].description,
    content: TEST_ITEM_LIST[0].content,
    tags: []
  };

  const TEST_ERROR_MESSAGE = new ApiError('ItemNotFound', 404, 'Item not found');

  beforeEach(() => {
    itemService = new ItemService();
    tagService = mock(TagService);
    when(tagService.findByItem(anyNumber())).thenReturn(Promise.resolve([]));
    when(tagService.addTagsToItem(anything())).thenReturn(Promise.resolve([]));
    when(tagService.removeAllFromItem(anything())).thenReturn(Promise.resolve(true));
    itemService.setTagService(instance(tagService));
    itemModel = mock(ItemModel);
  });

  it('should return a list of items', async () => {
    expect.assertions(1);
    when(itemModel.getAll()).thenReturn(Promise.resolve(TEST_ITEMS_DB_RESULT));
    itemService.setModel(instance(itemModel));

    await expect(itemService.getAll()).resolves.toEqual(TEST_ITEM_LIST);
  });

  it('should return an item by id', async () => {
    expect.assertions(1);
    when(itemModel.findById(TEST_ITEM_LIST[0].id)).thenReturn(Promise.resolve(TEST_ITEMS_DB_RESULT[0]));
    itemService.setModel(instance(itemModel));

    await expect(itemService.findById(TEST_ITEM_LIST[0].id)).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable no-empty */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable no-empty */
    when(itemModel.findById(TEST_ITEM_LIST[1].id)).thenReturn(rejectPromise);
    itemService.setModel(instance(itemModel));

    try {
      await itemService.findById(TEST_ITEM_LIST[1].id);
    } catch (error) {
      expect(error.getName()).toEqual('ItemNotFound');
      expect(error.getStatus()).toEqual(404);
    }
  });

  it('should add an item', async () => {
    expect.assertions(1);
    when(itemModel.insert(anything())).thenReturn(Promise.resolve(TEST_ITEMS_DB_RESULT));
    itemService.setModel(instance(itemModel));

    await expect(itemService.insert(ITEM_IMSERT_TEST_REQUEST)).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

  it('should delete an item', async () => {
    expect.assertions(1);
    when(itemModel.remove(TEST_ITEM_LIST[0].id)).thenReturn(Promise.resolve(true));
    itemService.setModel(instance(itemModel));

    await expect(itemService.remove(TEST_ITEM_LIST[0].id)).resolves.toEqual(true);
  });

  it('should update an item', async () => {
    expect.assertions(1);
    when(itemModel.update(anything())).thenReturn(Promise.resolve(TEST_ITEMS_DB_RESULT[0]));
    itemService.setModel(instance(itemModel));

    await expect(itemService.update(TEST_ITEM_LIST[0])).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

});
