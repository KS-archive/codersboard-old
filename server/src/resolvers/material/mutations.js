const validate = require('utils/validate');

const createMaterial = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.createMaterial(args, info);
};

const updateMaterial = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.updateMaterial(args, info);
};

const deleteMaterial = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.deleteMaterial(args, info);
};

const createMaterialTag = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.createMaterialTag(args, info);
};

const updateMaterialTag = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.updateMaterialTag(args, info);
};

const deleteMaterialTag = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.deleteMaterialTag(args, info);
};

module.exports = {
  createMaterial,
  updateMaterial,
  deleteMaterial,
  createMaterialTag,
  updateMaterialTag,
  deleteMaterialTag,
};
