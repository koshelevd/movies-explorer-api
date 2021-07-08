const router = require('express').Router();

const {
  patchMeSchema,
} = require('../utils/schemas');

const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', patchMeSchema, updateUser);

module.exports = router;
