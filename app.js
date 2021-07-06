const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'bitfilmsdb',
  PORT = 3000,
  API_PATH = '',
} = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(`${API_PATH}/users`, auth, require('./routes/users'));
app.use(`${API_PATH}/movies`, auth, require('./routes/movies'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
