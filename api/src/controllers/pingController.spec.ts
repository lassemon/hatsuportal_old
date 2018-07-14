import { PingController } from 'controllers/pingController';

describe('Controller/Ping', () => {
  describe('ping', () => {
    test('should return pong!', () => {
      const controller = new PingController();
      return controller.ping().then((data) => expect(data).toEqual('Pong!'));
    });
  });
});
