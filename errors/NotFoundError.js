const messages = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = messages.notFoundError.default) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
