const validate = require('utils/validate');

const createEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.createEvent(args, info);
};

const updateEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.updateEvent(args, info);
};

const deleteEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  return ctx.prisma.mutation.deleteEvent(args, info);
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
}
