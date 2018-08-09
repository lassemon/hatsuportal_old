import { IUser } from 'interfaces/user';
import { isEmpty } from 'lodash';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import UserService from 'services/UserService';
import { TsoaRoute } from 'tsoa';

interface IJwtPayload {
  user?: IUser;
  iat?: Date;
}

export default class Authentication {

  private passport: PassportStatic;

  constructor(passport: PassportStatic) {
    this.passport = passport;
    this.init();
  }

  private init = () => {
    const userService = new UserService();

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };

    this.passport.use(new Strategy(options, async (jwtPayload: IJwtPayload, done: VerifiedCallback) => {
      try {
        const result = await userService.findById(jwtPayload.user.id) as IUser;

        if (isEmpty(result)) {
          return done(result, false);
        }

        if (!result) {
          return done(null, false);
        } else {
          return done(null, result, { issuedAt: jwtPayload.iat });
        }
      } catch (error) {
        return done(error, false);
      }
    }));
  }

  public getAuthMiddleware = () => {
    return (security: TsoaRoute.Security[] = []) => {
      return this.passport.authenticate('jwt', { session: false });
    };
  }

  public getPassport() {
    return this.passport;
  }

}

