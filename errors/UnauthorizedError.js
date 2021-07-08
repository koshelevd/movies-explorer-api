const messages = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = messages.unauthorizedError.default) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
