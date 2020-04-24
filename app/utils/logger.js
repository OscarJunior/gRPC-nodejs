const { createLogger, format, transports } = require('winston');
const { NODE_ENV } = require('../config/environment');

function init() {
  const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: { service: 'note-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log`
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  //
  // If we're not in production then **ALSO** log to the `console`
  // with the colorized simple format.
  //
  if (NODE_ENV === 'dev') {
    logger.add(
      new transports.Console({
        format: format.json(),
      })
    );
  }

  return function getLogger() {
    return logger;
  };
}

module.exports = init()();
