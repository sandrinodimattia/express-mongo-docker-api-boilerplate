const bluebird = require('bluebird');
const mongoose = require('mongoose');

const logger = require('../lib/logger');

mongoose.Promise = bluebird;

module.exports = function phase(done) {
  mongoose.connection.on('open', () => logger.info('Opened connection to MongoDB.'));
  mongoose.connection.on('connected', () => logger.info('Connection to MongoDB has been established.'));
  mongoose.connection.on('reconnected', () => logger.info('Reconnected to MongoDB.'));
  mongoose.connection.on('disconnected', () => logger.error('Disconnected from MongoDB.'));
  mongoose.connection.on('error', err => logger.error(err, 'Error connecting to MongoDB.'));

  const options = {
    promiseLibrary: bluebird,
    server: {
      auto_reconnect: process.env.NODE_ENV !== 'test',
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  const disconnect = () => mongoose.disconnect();
  process
    .on('SIGINT', disconnect)
    .on('SIGTERM', disconnect);

  if (process.env.NODE_ENV === 'test') {
    return done();
  }

  return mongoose.connect(process.env.MONGO_URI, options)
    .then(done)
    .catch(done);
};
