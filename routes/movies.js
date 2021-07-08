const router = require('express').Router();

const { postMovieSchema, objectIdSchema } = require('../utils/schemas');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', postMovieSchema, createMovie);
router.delete('/:id', objectIdSchema, deleteMovie);

module.exports = router;
