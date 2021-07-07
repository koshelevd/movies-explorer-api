const messages = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = messages.badRequestError.default) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
