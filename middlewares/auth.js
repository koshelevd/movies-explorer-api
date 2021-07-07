const jwt = require('jsonwebtoken');
const config = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const unauthorizedError = new UnauthorizedError();

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw unauthorizedError;
  }

  let payload;

  try {
    payload = jwt.verify(token, config.jwtSecret);
  } catch {
    throw unauthorizedError;
  }

  req.user = payload;

  next();
};
