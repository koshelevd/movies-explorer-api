const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'bitfilmsdb',
  NODE_ENV,
  PORT = 3000,
  API_PATH = '',
} = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(`${API_PATH}/`, require('./routes/auth'));
app.use(`${API_PATH}/users`, auth, require('./routes/users'));
app.use(`${API_PATH}/movies`, auth, require('./routes/movies'));

app.use((req, res, next) => {
  next(new NotFoundError('Endpoint or method not found'));
});

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(err);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal server error' : message,
  });
  next();
});

app.listen(NODE_ENV === 'production' ? PORT : 3000);
