const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlValidate } = require('../utils/constants');
const {
  getUsersById,
  getUsers,
  updateUserById,
  updateUserAvatar,
  getUserCurrent,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserCurrent);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUsersById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlValidate),
  }),
}), updateUserAvatar);

module.exports = router;
