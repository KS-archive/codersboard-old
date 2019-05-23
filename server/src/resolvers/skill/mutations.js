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

const updateMySkills = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  const currentSkills = await ctx.prisma.query.userSkills({ where: { user: { id: ctx.request.userId } } }, '{ id }');

  const currentSkillsIds = currentSkills.map(({ id }) => id);
  const newSkillsIds = args.data.filter(({ id }) => !!id).map(({ id }) => id);

  const toDelete = currentSkillsIds.filter(skillId => !newSkillsIds.includes(skillId));
  const [toCreate, toUpdate] = args.data.reduce(
    (acc, skill) => {
      if (!skill.id) acc[0].push(skill);
      else if (currentSkills.find(({ id }) => id === skill.id).level !== skill.level) acc[1].push(skill);
      return acc;
    },
    [[], []],
  );

  for (const skillId of toDelete) {
    await ctx.prisma.mutation.deleteUserSkill({
      where: { id: skillId },
    });
  }

  for (const skill of toUpdate) {
    await ctx.prisma.mutation.updateUserSkill({
      where: { id: skill.id },
      data: { level: skill.level },
    });
  }

  for (const skill of toCreate.reverse()) {
    await ctx.prisma.mutation.createUserSkill({
      data: {
        level: skill.level,
        user: { connect: { id: ctx.request.userId } },
        skill: { connect: { id: skill.skillId } },
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
