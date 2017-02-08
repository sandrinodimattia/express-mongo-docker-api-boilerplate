const mongoose = require('mongoose');
const createServer = require('../../server');

module.exports.start = (t) => {
  createServer((err, srv) => {
    t.context = {
      server: srv
    };

    if (err) {
      return t.end(err);
    }

    mongoose.connect('mongodb://mongo:27017/tests');
    mongoose.connection.once('open', () => {
      mongoose.connection.db.dropDatabase(t.end);
    });
  });
};

module.exports.stop = (t) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close(t.end);
};
