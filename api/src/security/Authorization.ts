import { IJwtPayload, IUser } from 'interfaces/user';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import Logger from 'utils/Logger';

const log = new Logger('Authorization');

export default class Authorization {

  private identifier: string;

  constructor() {
    this.identifier = process.env.IDENTIFIER || 'HatsuPortal';
  }

  public createAuthToken = (user: IUser): string => {
    const jwtTokenLife = parseInt(process.env.TOKEN_EXP_TIME_MINUTES, 10) || 15;
    const jwtSecret = process.env.JWT_SECRET || 'jwtSecret';
    const expires = moment().add(jwtTokenLife, 'minutes').unix();
    const authToken = jwt.sign(
      {
        exp: expires,
        user: user.id
      },
      jwtSecret,
      {
        issuer: this.identifier,
        subject: this.identifier + '|' + user.id
      }
    );

    log.debug('CREATED AUTH TOKEN THAT IS ISSUED AT ' +
      moment.unix(this.decodeToken(authToken).iat).format('dd HH:mm:ss'));
    log.debug('CREATED AUTH TOKEN THAT EXPIRES IN ' +
      moment.unix(this.decodeToken(authToken).exp).format('dd HH:mm:ss'));

    return authToken;
  }

  public createRefreshToken = (user: IUser): string => {
    const refreshTokenLife = parseInt(process.env.REFRESH_TOKEN_EXP_TIME_MINUTES, 10) || 720;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refreshSecret';
    const expires = moment().add(refreshTokenLife, 'minutes').unix();
    const refreshToken = jwt.sign(
      {
        exp: expires,
        user: user.id
      },
      refreshTokenSecret,
      {
        issuer: this.identifier,
        subject: this.identifier + '|' + user.id
      }
    );

    log.debug('CREATED REFRESH TOKEN THAT IS ISSUED AT ' +
      moment.unix(this.decodeToken(refreshToken).iat).format('dd HH:mm:ss'));
    log.debug('CREATED REFRESH TOKEN THAT EXPIRES IN ' +
      moment.unix(this.decodeToken(refreshToken).exp).format('dd HH:mm:ss'));

    return refreshToken;
  }

  public decodeToken = (token: string): IJwtPayload => {
    return jwt.decode(token) as IJwtPayload;
  }

  public validateToken = (token: IJwtPayload): boolean => {
    let isValid = false;

    const expires = moment.unix(token.exp);

    isValid = expires.isAfter(moment());

    return isValid;
  }
}