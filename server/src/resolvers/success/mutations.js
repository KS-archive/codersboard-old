const validate = require('utils/validate');

const createSuccess = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  args.data.creator = { connect: { id: ctx.request.userId } };
  return ctx.prisma.mutation.createSuccess(args, info);
};

const updateSuccess = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  args.data.creator = { connect: { id: ctx.request.userId } };
  return ctx.prisma.mutation.updateSuccess(args, info);
};

const deleteSuccess = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.deleteSuccess(args, info);
};

module.exports = {
  createSuccess,
  updateSuccess,
  deleteSuccess,
}
