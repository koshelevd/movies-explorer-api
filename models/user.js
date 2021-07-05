const mongoose = require('mongoose');
const { isEmail } = require('validator');

const validateEmail = [
  {
    validator: value => isEmail(value),
    message: 'You should specify valid user email!',
  },
  {
    async validator(value) {
      const emailCount = await this.constructor.countDocuments({
        email: value,
      });
      return !emailCount;
    },
    message: 'User exists!',
  },
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
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

module.exports = mongoose.model('user', userSchema);
