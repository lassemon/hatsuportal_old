import { IJwtPayload, IUser } from 'interfaces/user';
import { isEmpty } from 'lodash';
import { PassportStatic } from 'passport';
import { Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import UserService from 'services/UserService';
import { TsoaRoute } from 'tsoa';

export default class Authentication {

  private passport: PassportStatic;
  private static instance: Authentication;

  constructor(passport: PassportStatic) {
    this.passport = passport;
    this.init();
  }

  private init = () => {
    if (!Authentication.instance) {
      const userService = new UserService();

      const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies.token;
        }
        return token;
      };

      const options: StrategyOptions = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
      };

      this.passport.use(new Strategy(options, async (jwtPayload: IJwtPayload, done: VerifiedCallback) => {
        try {
          const result = await userService.findById(jwtPayload.user) as IUser;

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

      Authentication.instance = this;
    }
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

