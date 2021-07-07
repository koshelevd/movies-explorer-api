const messages = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = messages.forbiddenError.default) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
