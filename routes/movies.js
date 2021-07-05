const router = require('express').Router();

const { postMovieSchema, objectIdSchema } = require('../utils/schemas');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie, postMovieSchema);
router.delete('/:id', deleteMovie, objectIdSchema);

module.exports = router;
