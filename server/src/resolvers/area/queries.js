const validate = require('../../utils/validate');

const areas = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.areas(args, info);
};

module.exports = {
  areas,
}
