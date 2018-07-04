import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from './routes';

// controllers need to be referenced in order to get crawled by the generator
import './controllers/pingController';

const app = express();

app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

const swaggerDocument = require('../dist/swagger.json');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

/* tslint:disable-next-line */
console.log('Starting server on port 3000...');
app.listen(3000);
