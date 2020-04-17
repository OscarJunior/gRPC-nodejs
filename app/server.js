const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const { PORT } = require('./config/environment');
const logger = require('./config/logger');
const database = require('./config/database');

const { noteAPI } = require('./api');

function main() {
  const server = new grpc.Server();
  const PROTO_PATH = path.resolve('app/proto/note.proto');

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const notes_proto = grpc.loadPackageDefinition(packageDefinition);

  server.addService(notes_proto.NoteService.service, noteAPI);
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());
  logger.log({
    level: 'info',
    message: `Your server is listening on port ${PORT} (http://0.0.0.0:${PORT})`,
  });
  server.start();
}

database.loadDB();
main();
