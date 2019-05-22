const validate = require('../../utils/validate');

const events = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.events(args, info);
};

module.exports = {
  events,
}
