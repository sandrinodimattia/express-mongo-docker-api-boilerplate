const validator = require('validator');

const errors = require('../lib/errors');
const User = require('../lib/models/user');

module.exports = function phase() {
  this.get('/users', (req, res, next) => {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
  });

  this.post('/users', (req, res, next) => {
    if (!req.body.username || validator.isEmpty(req.body.username)) {
      return next(new errors.ValidationError(
        'validation_error', 'The username is required'
      ));
    }

    const user = new User({
      username: req.body.username
    });

    user.save()
       .then(savedUser => res.json(savedUser))
       .catch(e => next(e));
  });

  this.get('/test', (req, res) => {
    res.sendStatus(200).end();
  });
};
