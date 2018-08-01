import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

/* tslint:disable no-any */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.statusCode || 500;
  const body: any = {
    fields: err.fields || undefined,
    message: err.message || 'An error occurred during the request',
    name: err.name,
    status
  };
  res.status(status).json(body);
});
/* tslint:enable no-any */

/* tslint:disable no-var-requires */
const swaggerDocument = require('../dist/swagger.json');
/* tslint:enable no-var-requires */
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

console.log('Starting server on port ' + process.env.PORT + '...');
app.listen(process.env.PORT || 3000);
