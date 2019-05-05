const userMutations = require('./user/mutations');
const universityMutations = require('./university/mutations');

const Mutation = {
  ...userMutations,
  ...universityMutations,
};

module.exports = Mutation;
