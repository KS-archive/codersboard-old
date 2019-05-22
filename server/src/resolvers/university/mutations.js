const validate = require('../../utils/validate');

const createUniversity = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.createUniversity(args, info);
};

const updateUniversity = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  return ctx.prisma.mutation.updateUniversity(args, info);
};

const deleteUniversity = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.deleteUniversity(args, info);
};

const addUserToUniversity = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  let university = await ctx.prisma.query.university({ where: { id: args.universityId } });

  university = await ctx.prisma.mutation.updateUniversity({ where: { id: args.universityId }, data: {
    users: {
      connect: { id: args.userId }
    }
  } }, info);

  return university;
};

module.exports = {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  addUserToUniversity,
}
