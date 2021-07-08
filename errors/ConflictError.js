const messages = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = messages.conflictError.default) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
