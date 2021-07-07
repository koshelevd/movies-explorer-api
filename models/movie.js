const mongoose = require('mongoose');
const { isURL } = require('validator');
const messages = require('../utils/constants');

const validateUrl = {
  validator: value => isURL(value, {
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: true,
  }),
  message: messages.invalidURL,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    minlength: 4,
    maxlength: 4,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: validateUrl,
  },
  trailer: {
    type: String,
    required: true,
    validate: validateUrl,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: validateUrl,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
