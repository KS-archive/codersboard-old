const validate = require('utils/validate');

const areas = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.areas(args, info);
};

const area = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.area(args, info);
};

module.exports = {
  areas,
  area,
}
