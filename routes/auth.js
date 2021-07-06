const router = require('express').Router();

const { signUpSchema, signInSchema } = require('../utils/schemas');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', signUpSchema, createUser);
router.post('/signin', signInSchema, login);
router.post('/signout', logout);

module.exports = router;
