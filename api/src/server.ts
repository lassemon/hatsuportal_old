
import app from 'app';
import * as swaggerUI from 'swagger-ui-express';

app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

const swaggerDocument = require('../dist/swagger.json');
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

console.log('Starting server on port 3000...');
app.listen(3000);
