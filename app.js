const express = require('express');
const mongoose = require('mongoose');

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'bitfilmsdb',
  PORT = 3000,
  API_PATH = '',
} = process.env;

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
