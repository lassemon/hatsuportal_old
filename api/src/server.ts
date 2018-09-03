import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as passport from 'passport';
import { RegisterRoutes } from 'routes';
import Authentication from 'security/Authentication';
import * as swaggerUI from 'swagger-ui-express';

import './controllers/ItemController';
import './controllers/StatusController';
import './controllers/TagController';
import './controllers/UserController';

const app = express();
const authentication = new Authentication(passport);

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CookieParser Middleware
app.use(cookieParser());

// Authentication Middleware
app.use(authentication.getPassport().initialize());
RegisterRoutes(app, authentication.getAuthMiddleware());

/* tslint:disable no-any */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const body: any = {
    fields: err.fields || undefined,
    message: err.message || 'An error occurred during the request',
    name: err.name,
    status
  };
  res.status(status).json(body);
});
/* tslint:enable no-any */

// SwaggerUI
/* tslint:disable no-var-requires */
const swaggerDocument = require('../dist/swagger.json');
/* tslint:enable no-var-requires */
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

console.log('Starting server on port ' + process.env.PORT + '...');
app.listen(process.env.PORT || 3000);
