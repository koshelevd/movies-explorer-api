const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const config = require('./config');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const indexRouter = require('./routes/index');
const singleErrorHandler = require('./middlewares/error-handler');

const app = express();
mongoose.connect(config.dbPath, config.dbOptions);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', indexRouter);

app.use(errorLogger);
app.use(errors());
app.use(singleErrorHandler);

app.listen(config.appPort);
