const validate = require('utils/validate');

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

const updateMySkills = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  const currentUserSkills = await ctx.prisma.query.userSkills({ where: { user: { id: ctx.request.userId } } }, '{ id skill { id } }');

  const newUserSkillsIds = args.data.filter(({ id }) => !!id).map(({ id }) => id);

  const toDelete = currentUserSkills.filter(({ id }) => !newUserSkillsIds.includes(id));

  const [toCreate, toUpdate] = args.data.reduce(
    (acc, userSkill) => {
      if (!userSkill.id) acc[0].push(userSkill);
      else if (currentUserSkills.find(({ id }) => id === userSkill.id).level !== userSkill.level) acc[1].push(userSkill);
      return acc;
    },
    [[], []],
  );

  for (const userSkill of toDelete) {
    await ctx.prisma.mutation.deleteUserSkill({
      where: { id: userSkill.id },
    });
  }

  for (const userSkill of toUpdate) {
    await ctx.prisma.mutation.updateUserSkill({
      where: { id: userSkill.id },
      data: { level: userSkill.level },
    });
  }

  for (const userSkill of toCreate.reverse()) {
    await ctx.prisma.mutation.createUserSkill({
      data: {
        level: userSkill.level,
        user: { connect: { id: ctx.request.userId } },
        skill: { connect: { id: userSkill.skill.id } },
      },
    });
  }

  return ctx.prisma.query.userSkills({ where: { user: { id: ctx.request.userId } } }, info);
};

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
  updateMySkills,
};
