import * as bodyParser from 'body-parser';
import * as express from 'express';
import { RegisterRoutes } from './routes';

// controllers need to be referenced in order to get crawled by the generator
import './controllers/pingController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

export default app;
