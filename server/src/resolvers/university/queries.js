const validate = require('utils/validate');

const universities = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.universities(args, info);
};

module.exports = {
  universities,
}
