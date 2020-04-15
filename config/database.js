const mongoose = require('mongoose');
const { MONGO_URI } = require('./environment');
const logger = require('./logger');

const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: 5, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

const loadDB = () => {
  mongoose.set('runValidators', true);
  mongoose.connect(MONGO_URI, DB_OPTIONS);
  mongoose.connection
    .once('open', () => {
      logger.log({
        level: 'info',
        message: 'Connected to data base successfully',
      });
    })
    .on('error', (error) => {
      logger.log({
        level: 'error',
        message: `Connection data base error: ${error}`,
      });
      mongoose.connection.close();
    })
    .on('disconnected', () => {
      logger.log({
        level: 'error',
        message: 'Lost MongoDB connection...',
      });
    })
    .on('reconnected', () => {
      logger.log({
        level: 'error',
        message: 'Reconnected to MongoDB',
      });
    });
};

module.exports = {
  loadDB,
};
