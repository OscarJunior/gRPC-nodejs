const logger = require('../config/logger');

function logError(err) {
  logger.log({
    level: 'error',
    name: err.name,
    stack: err.stack,
    isOperational: err.isOperational,
  });
}

function handleError(err) {
  logError(err);

  if (err.isOperational) {
    process.exit(1);
  }
}

module.exports = handleError;
