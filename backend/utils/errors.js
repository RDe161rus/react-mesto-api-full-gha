const ValidationError = require('./errors/ValidationError');
const AthorizedError = require('./errors/AthorizedError');
const ForbiddenError = require('./errors/ForbiddenError');
const NotFoundError = require('./errors/NotFoundError');
const ConflictError = require('./errors/ConflictError');

module.exports = {
  ValidationError,
  AthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
