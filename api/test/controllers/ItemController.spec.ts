import 'jest';
import {instance, mock, when} from 'ts-mockito-2/lib/ts-mockito';
import { ItemController } from '../../src/controllers/ItemController';
import ApiError from '../../src/errors/ApiError';
import { Item } from '../../src/interfaces/item';
import ItemService from '../../src/services/ItemService';

describe('UserController', () => {

  let itemService: ItemService;
  const controller: ItemController = new ItemController();

  const TEST_ITEM_LIST: Item[] = [
    {
      id: 123,
      type: 'article',
      title: 'Jykän paras resepti',
      description: 'Tällä pääsee hekumaan',
      content: 'test',
      created: new Date(),
      authorId: 69
    },
    {
      id: 420,
      type: 'video',
      title: 'Hyvä biisi',
      description: 'Kato loppuun asti',
      content: 'https://www.youtube.com/watch?v=N9cml2D8VU0',
      created: new Date(),
      authorId: 69
    }
  ];

  beforeEach(() => {
    itemService = mock(ItemService);
  });

  it('should return a list of items', async () => {
    expect.assertions(1);
    when(itemService.getAll()).thenReturn(Promise.resolve(TEST_ITEM_LIST));
    controller.setService(instance(itemService));

    await expect(controller.getAll()).resolves.toBe(TEST_ITEM_LIST);
  });
});
