const validate = require('utils/validate');

const successes = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.successes(args, info);
};

module.exports = {
  successes,
}
