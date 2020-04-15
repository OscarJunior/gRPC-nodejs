const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const grpc = require('grpc');
const logger = require('../config/logger');

const PROTO_PATH = path.resolve('services/proto/note.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const notes_proto = grpc.loadPackageDefinition(packageDefinition);

logger.log({
  level: 'info',
  message: 'Note service was loaded',
});

module.exports = notes_proto.NoteService.service;
