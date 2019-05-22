const signale = require('signale');

module.exports = (err, req, res, next) => {
  if (err) {
    signale.error(err);
    res.status(500).send(err);
  }
};
