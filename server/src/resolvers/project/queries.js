const validate = require('../../utils/validate');

const projects = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.projects(args, info);
};

module.exports = {
  projects,
}
