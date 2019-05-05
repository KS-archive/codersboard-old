const userQueries = require('./user/queries');
const universityQueries = require('./university/queries');

const Query = {
  ...userQueries,
  ...universityQueries,
};

module.exports = Query;
