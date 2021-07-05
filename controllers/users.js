const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('User is not found');
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
      if (err.message.includes('User exists')) {
        next(new ConflictError('User exists!'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const updateUserInfo = (userId, res, next, data) => {
  User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    .then(user => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  updateUserInfo(req.user._id, res, next, { name, email });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').end();
  } catch (err) {
    next(err);
  }
};
