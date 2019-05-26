const validate = require('utils/validate');

const createSuccess = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);
  args.data.creator = { connect: { id: ctx.request.userId } };
  return ctx.prisma.mutation.createSuccess(args, info);
};

const updateSuccess = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN']);

  const current = await ctx.prisma.query.success({ where: args.where }, '{ id users { id } }');
  const newUsersIds = args.data.users.connect.map(({ id }) => id);
  args.data.users.disconnect = [];

  for (const user of current.users) {
    if (!newUsersIds.includes(user.id)) {
      args.data.users.disconnect.push({ id: user.id });
    }
  }

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
