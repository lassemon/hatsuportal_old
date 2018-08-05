import 'jest';
import Encryption from '../../src/security/Encryption';

describe('ItemService', () => {

  it('should match password with hash', async () => {
    expect.assertions(1);

    const hash = await Encryption.encrypt('root');
    const comparison = await Encryption.compare('root', hash);

    await expect(comparison).toBe(true);
  });

});