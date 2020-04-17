const logger = require('../config/logger');

function logError(err) {
  logger.log({
    level: 'error',
    name: err.name,
    stack: err.stack,
    message: err.message,
  });
}

function handleError(err, isOperational = true) {
  logError(err);

  if (!isOperational) {
    process.exit(1);
  }
}

module.exports = handleError;
