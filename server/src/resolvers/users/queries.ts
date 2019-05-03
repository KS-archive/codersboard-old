import hasPermissions from '../../services/hasPermissions';

export const me = (parent, args, ctx, info) => {
  if (!ctx.request.user) {
    return null;
  }
  return ctx.prisma.query.user(
    {
      where: { id: ctx.request.user.id },
    },
    info,
  );
};

export const users = (parent, args, ctx, info) => {
  if (!hasPermissions(ctx, ['OWNER', 'HR'])) {
    return null;
  }
  return ctx.prisma.query.users();
};
