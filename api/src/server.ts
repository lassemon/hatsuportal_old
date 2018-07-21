import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

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

app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

const swaggerDocument = require('../dist/swagger.json');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

console.log('Starting server on port 3000...');
app.listen(3000);
