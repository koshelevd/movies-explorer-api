const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const messages = require('../utils/constants');

const authRoutes = require('./auth');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/', authRoutes);
router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.use((req, res, next) => {
  next(new NotFoundError(messages.pathNotFound));
});

module.exports = router;
