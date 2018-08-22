import 'jest';
import { instance, mock, when } from 'ts-mockito-2/lib/ts-mockito';
import { ItemController } from '../../src/controllers/ItemController';
import ApiError from '../../src/errors/ApiError';
import { IItem } from '../../src/interfaces/item';
import ItemService from '../../src/services/ItemService';

describe('ItemController', () => {

  let itemService: ItemService;
  const controller: ItemController = new ItemController();

  const TEST_ITEM_LIST: IItem[] = [
    {
      id: 123,
      type: 'article',
      title: 'Jykän paras resepti',
      description: 'Tällä pääsee hekumaan',
      content: 'test',
      created: new Date(),
      authorId: 69,
      authorName: 'jykajee',
      tags: []
    },
    {
      id: 420,
      type: 'video',
      title: 'Hyvä biisi',
      description: 'Kato loppuun asti',
      content: 'https://www.youtube.com/watch?v=N9cml2D8VU0',
      created: new Date(),
      authorId: 69,
      authorName: 'Mister Thane',
      tags: []
    }
  ];

  const TEST_ERROR_MESSAGE = new ApiError(404, 'ItemNotFound', 'Item not found');

  beforeEach(() => {
    itemService = mock(ItemService);
  });

  it('should return a list of items', async () => {
    expect.assertions(1);
    when(itemService.getAll()).thenReturn(Promise.resolve(TEST_ITEM_LIST));
    when(itemService.getTagsForAll(TEST_ITEM_LIST)).thenReturn(Promise.resolve(TEST_ITEM_LIST));
    controller.setService(instance(itemService));

    await expect(controller.getAll()).resolves.toEqual(TEST_ITEM_LIST);
  });

  it('should return an item by id', async () => {
    expect.assertions(1);
    when(itemService.findById(123)).thenReturn(Promise.resolve(TEST_ITEM_LIST[0]));
    controller.setService(instance(itemService));

    await expect(controller.get(123)).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

  it('should fail', async () => {
    expect.assertions(2);
    const rejectPromise = Promise.reject(TEST_ERROR_MESSAGE);
    /* tslint:disable */
    rejectPromise.catch(() => { }); // to suppress UnhandledPromiseRejectionWarning
    /* tslint:enable */
    when(itemService.findById(456)).thenReturn(rejectPromise);
    controller.setService(instance(itemService));

    try {
      const result = await controller.get(456);
    } catch (error) {
      expect(error.statusText).toEqual('ItemNotFound');
      expect(error.status).toEqual(404);
    }
  });

  it('should add an item', async () => {
    expect.assertions(1);
    when(itemService.insert(TEST_ITEM_LIST[0])).thenReturn(Promise.resolve(TEST_ITEM_LIST[0]));
    controller.setService(instance(itemService));

    await expect(controller.insert(TEST_ITEM_LIST[0])).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

  it('should delete an item', async () => {
    expect.assertions(1);
    when(itemService.remove(TEST_ITEM_LIST[0].id)).thenReturn(Promise.resolve(true));
    controller.setService(instance(itemService));

    await expect(controller.delete(TEST_ITEM_LIST[0].id)).resolves.toEqual(true);
  });

  it('should update an item', async () => {
    expect.assertions(1);
    when(itemService.update(TEST_ITEM_LIST[0])).thenReturn(Promise.resolve(TEST_ITEM_LIST[0]));
    controller.setService(instance(itemService));

    await expect(controller.put(TEST_ITEM_LIST[0])).resolves.toEqual(TEST_ITEM_LIST[0]);
  });

});
