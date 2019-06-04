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

const attendEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  await ctx.prisma.mutation.upsertAttendee({
    where: {
      id: args.attendeeId,
    },
    update: {
      status: 'YES',
    },
    create: {
      user: { connect: { id: ctx.request.userId } },
      event: { connect: { id: args.eventId } },
      status: 'YES',
    },
  });

  return { message: 'ATTEND' };
};

const neglectEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  await ctx.prisma.mutation.upsertAttendee({
    where: {
      id: args.attendeeId,
    },
    update: {
      status: 'NO',
    },
    create: {
      user: { connect: { id: ctx.request.userId } },
      event: { connect: { id: args.eventId } },
      status: 'NO',
    },
  });

  return { message: 'NEGLECT' };
};

module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  attendEvent,
  neglectEvent,
}
