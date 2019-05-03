const validate = require('../../utils/validate');

const me = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();

  return ctx.prisma.query.user(
    {
      where: { id: ctx.request.userId },
    },
    info,
  );
};

const users = async (parent, args, ctx, info) => {
  await validate(ctx).userExist().userHasPermission(['OWNER', 'HR']);

  return ctx.prisma.query.users();
};

module.exports = {
  me,
  users,
}
