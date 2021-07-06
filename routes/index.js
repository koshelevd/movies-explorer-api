const router = require('express').Router();

const { API_PATH = '' } = process.env;
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use(`${API_PATH}/`, authRoutes);
router.use(`${API_PATH}/users`, auth, usersRoutes);
router.use(`${API_PATH}/movies`, auth, moviesRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Endpoint or method not found'));
});
