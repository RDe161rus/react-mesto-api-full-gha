const jwt = require('jsonwebtoken');
const AthorizedError = require('../utils/errors/AthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'jwt_secret');
  } catch (err) {
    return next(new AthorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
