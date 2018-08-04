import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

export default class Ecryption {
  public static encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log('DIS BE PASSWORD HASH', hash);
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }
}
