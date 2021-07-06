const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const singleErrorHandler = require('./middlewares/errorsHandler');

require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'bitfilmsdb',
  NODE_ENV,
  PORT = 3000,
} = process.env;

const app = express();

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(singleErrorHandler);

app.listen(NODE_ENV === 'production' ? PORT : 3000);
