const validate = require('utils/validate');

const posts = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.posts(args, info);
};

module.exports = {
  posts,
}
