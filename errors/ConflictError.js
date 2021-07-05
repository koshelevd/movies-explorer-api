class ConflictError extends Error {
  constructor(message = 'Conflicting request') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
