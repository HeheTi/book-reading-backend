require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRouter = require('./routes/api/auth');
const { errorHandler, errorNotFoundHandler } = require('./helpers');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const swaggerDocument = YAML.load('./data/swagger.yaml');

app.set('trust proxy', true);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', authRouter);

app.use(errorNotFoundHandler);
app.use(errorHandler);

module.exports = app;
