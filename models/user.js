const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { isEmail } = require('validator');
const messages = require('../utils/constants');

const UnauthorizedError = require('../errors/UnauthorizedError');

const validateEmail = [
  {
    validator: value => isEmail(value),
    message: messages.invalidEmail,
  },
  {
    async validator(value) {
      const emailCount = await this.constructor.countDocuments({
        email: value,
      });
      return !emailCount;
    },
    message: messages.users.exists,
  },
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validateEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const authFailed = new UnauthorizedError(messages.authFailed);

function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then(user => {
      if (!user) {
        return Promise.reject(authFailed);
      }
      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) {
          return Promise.reject(authFailed);
        }
        return user;
      });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
