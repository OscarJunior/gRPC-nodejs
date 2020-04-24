const AppError = require('./AppError');
const defaultErrorHandler = require('./handler');
const commonErrors = require('./commonErrors');

module.exports = {
  AppError,
  defaultErrorHandler,
  ...commonErrors,
};
