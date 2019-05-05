const validate = require('../../utils/validate');

const createSkill = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.createSkill(args, info);
};

const updateSkill = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.updateSkill(args, info);
};

const deleteSkill = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.deleteSkill(args, info);
};

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
}
