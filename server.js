const grpc = require('grpc');

const { PORT } = require('./config/environment');
const logger = require('./config/logger');

const { features, noteService } = require('./api');

function main() {
  const server = new grpc.Server();

  server.addService(noteService, features);
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  logger.log({
    level: 'info',
    message: `Your server is listening on port ${PORT} (http://localhost:${PORT})`,
  });
  server.start();
}

main();
