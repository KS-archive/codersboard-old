const validate = require('utils/validate');

const createEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);
  args.data.owner = { connect: { id: ctx.request.userId } };

  const userIds = args.data.attendees.connect.map(({ id }) => id);
  args.data.attendees = [];

  const event = await ctx.prisma.mutation.createEvent(args, '{ id }');

  for (const userId of userIds) {
    await addNewAttendee(userId, event.id, ctx);
  }

  return ctx.prisma.query.event({ where: { id: event.id } }, info);
};

const addNewAttendee = async (userId, eventId, ctx) => {
  const attendee = await ctx.prisma.mutation.createAttendee({
    data: {
      event: { connect: { id: eventId} },
      user: { connect: { id: userId } },
    }
  });

  return attendee;
}

const updateEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);

  const event = await ctx.prisma.query.event({ where: args.where }, '{ attendees { id user { id } } }');
  const eventUsers = event.attendees.map(({ id, user }) => ({ attendeeId: id, userId: user.id }));
  const userIds = args.data.attendees.connect.map(({ id }) => id);

  // Delete attendees
  for (const eventUser of eventUsers) {
    if (!userIds.includes(eventUser.userId)) {
      await ctx.prisma.mutation.deleteAttendee({ where: { id: eventUser.attendeeId } });
    }
  }

  // Add new attendees
  for (const userId of userIds) {
    const attendees = await ctx.prisma.query.attendees({ where: { AND: [
      { user: { id: userId } },
      { event: { id: args.where.id } },
    ] } });

    const attendee = attendees[0];

    if (!attendee) {
      await addNewAttendee(userId, args.where.id, ctx);
    }
  }

  delete args.data.attendees;
  delete args.data.owner;

  return ctx.prisma.mutation.updateEvent(args, info);
};

const deleteEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'ADMIN', 'MEMBER']);

  const event = await ctx.prisma.query.event(args, '{ attendees { id } }');

  for (const attendee of event.attendees) {
    await ctx.prisma.mutation.deleteAttendee({ where: { id: attendee.id } });
  }

  return ctx.prisma.mutation.deleteEvent(args, info);
};

const attendEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();

  if (args.attendeeId) {
    await ctx.prisma.mutation.updateAttendee({
      where: {
        id: args.attendeeId,
      },
      data: {
        status: 'YES',
      },
    });
  } else {
    await ctx.prisma.mutation.createAttendee({
      data: {
        user: { connect: { id: ctx.request.userId } },
        event: { connect: { id: args.eventId } },
        status: 'YES',
      },
    });
  }

  return { message: 'ATTEND' };
};

const neglectEvent = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  await ctx.prisma.mutation.updateAttendee({
    where: {
      id: args.attendeeId,
    },
    data: {
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
};
