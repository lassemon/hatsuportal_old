import 'jest';
import { PingController } from '../../src/controllers/PingController';

describe('Controller/Ping', () => {
  describe('ping', () => {
    test('should return pong!', () => {
      const controller = new PingController();
      return controller.ping().then((data) => expect(data).toEqual('Pong!'));
    });
  });
});
