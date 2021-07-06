const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const validateURL = (value, helpers) => {
  if (
    !isURL(value, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
    })
  ) {
    return helpers.message("URL you've provided isn't valid!");
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
    image: Joi.required().custom(validateURL, 'custom validation'),
    trailer: Joi.required().custom(validateURL, 'custom validation'),
    thumbnail: Joi.required().custom(validateURL, 'custom validation'),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
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
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  objectIdSchema,
  patchMeSchema,
  postMovieSchema,
  signInSchema,
  signUpSchema,
};
