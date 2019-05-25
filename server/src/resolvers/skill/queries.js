const validate = require('utils/validate');

const skills = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.skills(args, info);
};

const mySkills = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.userSkills({ where: { user: { id: ctx.request.userId } }, orderBy: 'createdAt_DESC' }, info);
};

module.exports = {
  skills,
  mySkills,
}
