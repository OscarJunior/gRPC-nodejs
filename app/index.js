// config
const server = require('./config/server');
const { loadDB } = require('./config/database');

// errors
const { defaultErrorHandler } = require('./utils/errors');

function main() {
  loadDB();
  server.start();
}

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  const isOperational = false;

  defaultErrorHandler(error, isOperational);
});

main();
