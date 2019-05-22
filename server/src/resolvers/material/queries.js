const validate = require('../../utils/validate');

const materials = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.materials(args, info);
};

const materialTags = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.materialTags(args, info);
};

module.exports = {
  materials,
  materialTags,
}
