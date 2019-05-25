const validate = require('utils/validate');

const createCredential = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.createCredential(args, info);
};

const updateCredential = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.updateCredential(args, info);
};

const deleteCredential = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.deleteCredential(args, info);
};

module.exports = {
  createCredential,
  updateCredential,
  deleteCredential,
};
