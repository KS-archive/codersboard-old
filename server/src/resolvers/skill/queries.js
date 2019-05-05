const validate = require('../../utils/validate');

const skills = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.skills(args, info);
};

module.exports = {
  skills,
}
