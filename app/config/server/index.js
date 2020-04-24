const grpc = require('grpc');
const path = require('path');
const protoLoader = require('@grpc/proto-loader');

const { PORT } = require('../environment');
const logger = require('../../utils/logger');
const { controller } = require('../../components/notes');
const utils = require('./utils');

function start() {
  const server = new grpc.Server();
  const PROTO_PATH = path.resolve('app/config/server/proto/note.proto');

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const notes_proto = grpc.loadPackageDefinition(packageDefinition);

  server.addService(notes_proto.NoteService.service, {
    list: (...args) => utils.generateResponse(controller.list, ...args),
    insert: (...args) => utils.generateResponse(controller.insert, ...args),
    remove: (...args) => utils.generateResponse(controller.remove, ...args),
  });
  server.bind(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure());

  logger.log({
    level: 'info',
    message: `Your server is listening on port ${PORT} (http://0.0.0.0:${PORT})`,
  });

  server.start();
}

module.exports = {
  start,
};
