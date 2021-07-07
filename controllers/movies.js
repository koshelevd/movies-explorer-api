const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then(users => res.send(users))
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then(data => Movie.findById(data._id)
      .populate('owner')
      .then(movie => res.status(201).send(movie)))
    .catch(err => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const handleResult = (obj, res) => {
  if (obj) {
    return res.send(obj);
  }
  throw new NotFoundError();
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (!movie) {
        throw new NotFoundError('Movie does not exist');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('You may delete only own movies');
      }
      return Movie.findOneAndRemove({
        _id: req.params.id,
        owner: req.user._id,
      });
    })
    .then(card => handleResult(card, res))
    .catch(next);
};
