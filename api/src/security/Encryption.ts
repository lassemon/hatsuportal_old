import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export default class Ecryption {

  public static encrypt(clearText: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(clearText, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  public static compare(clearText: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(clearText, hash, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
