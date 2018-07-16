import 'jest';
import { PingController } from '../../src/controllers/PingController';

describe('PingController', () => {

  it('should return pong!', () => {
    const controller = new PingController();
    controller.ping().then((data) => expect(data).toEqual('Pong!'));
  });

});
