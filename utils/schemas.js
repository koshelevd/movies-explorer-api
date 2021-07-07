const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const messages = require('./constants');

const validateURL = (value, helpers) => {
  if (
    !isURL(value, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
    })
  ) {
    return helpers.message(messages.invalidURL);
  }

  return value;
};

const objectIdSchema = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const patchMeSchema = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const postMovieSchema = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required(),
    image: Joi.required().custom(validateURL, messages.imageNotValid),
    trailer: Joi.required().custom(validateURL, messages.trailerNotValid),
    thumbnail: Joi.required().custom(validateURL, messages.thumbnailNotValid),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const signInSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpSchema = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  objectIdSchema,
  patchMeSchema,
  postMovieSchema,
  signInSchema,
  signUpSchema,
};
