import 'jest';
import { StatusController } from '../../src/controllers/StatusController';

describe('StatusController', () => {

  it('should return true', () => {
    const controller = new StatusController();
    controller.status().then((data) => expect(data).toEqual(true));
  });

});
