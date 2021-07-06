const router = require('express').Router();

const auth = require('../middlewares/auth');

const { signUpSchema, signInSchema } = require('../utils/schemas');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', signUpSchema, createUser);
router.post('/signin', signInSchema, login);
router.post('/signout', auth, logout);

module.exports = router;
