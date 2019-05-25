const validate = require('utils/validate');

const createArea = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.createArea(args, info);
};

const updateArea = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.updateArea(args, info);
};

const deleteArea = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.deleteArea(args, info);
};

module.exports = {
  createArea,
  updateArea,
  deleteArea,
}
