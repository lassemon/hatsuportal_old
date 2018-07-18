import * as bodyParser from 'body-parser';
import * as express from 'express';
import { RegisterRoutes } from './routes';

// controllers need to be referenced in order to get crawled by the generator
import './controllers/ItemController';
import './controllers/PingController';
import './controllers/TagController';
import './controllers/UserController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const status = err.statusCode || 500;
  const body: any = {
    fields: err.fields || undefined,
    message: err.message || 'An error occurred during the request.',
    name: err.name,
    status
  };
  res.status(status).json(body);
});

export default app;
