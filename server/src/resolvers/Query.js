const userQueries = require('./user/queries');
const universityQueries = require('./university/queries');
const successQueries = require('./success/queries');
const skillQueries = require('./skill/queries');
const projectQueries = require('./project/queries');
const areaQueries = require('./area/queries');
const eventQueries = require('./event/queries');
const postQueries = require('./post/queries');

const Query = {
  ...userQueries,
  ...universityQueries,
  ...successQueries,
  ...skillQueries,
  ...projectQueries,
  ...areaQueries,
  ...eventQueries,
  ...postQueries,
};

module.exports = Query;
