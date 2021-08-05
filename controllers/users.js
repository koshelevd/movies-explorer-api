const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');
const messages = require('../utils/constants');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (user) {
        return res.send(user);
      }
      return new NotFoundError(messages.users.notFound);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => User.create({ ...req.body, password: hash }))
    .then(user => User.findById(user._id)) // Select user without password field
    .then(user => res.status(201).send(user))
    .catch(err => {
      if (err.code === 11000) {
        next(new ConflictError(messages.users.exists));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (userId, res, next, data) => {
  User.findByIdAndUpdate(userId, data, { new: true })
    .then(user => res.send(user))
    .catch(err => {
      if (err.code === 11000) {
        next(new ConflictError(messages.users.exists));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  updateUserInfo(req.user._id, res, next, { name, email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => User.findById(user._id)) // Select user without password field
    .then(user => {
      const token = jwt.sign(
        { _id: user._id },
        config.jwtSecret,
        config.jwtSignOptions,
      );
      res
        .cookie('jwt', token, config.jwtCookieOptions)
        .send(user);
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Log out success' });
  } catch (err) {
    next(err);
  }
};
