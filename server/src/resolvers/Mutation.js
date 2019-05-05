const userMutations = require('./user/mutations');
const universityMutations = require('./university/mutations');
const successMutations = require('./success/mutations');
const skillMutations = require('./skill/mutations');
const projectMutations = require('./project/mutations');
const areaMutations = require('./area/mutations');
const eventMutations = require('./event/mutations');
const postMutations = require('./post/mutations');

const Mutation = {
  ...userMutations,
  ...universityMutations,
  ...successMutations,
  ...skillMutations,
  ...projectMutations,
  ...areaMutations,
  ...eventMutations,
  ...postMutations,
};

module.exports = Mutation;
