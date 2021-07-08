const Movie = require('../models/movie');

const messages = require('../utils/constants');

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
      } else {
        next(err);
      }
    });
};

const handleResult = (obj, res) => {
  if (obj) {
    return res.send(obj);
  }
  return new NotFoundError();
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then(movie => {
      if (!movie) {
        next(new NotFoundError(messages.movies.delete.notFound));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError(messages.movies.delete.forbidden));
      }
      return Movie.findOneAndRemove({
        _id: req.params.id,
        owner: req.user._id,
      });
    })
    .then(card => handleResult(card, res))
    .catch(next);
};
