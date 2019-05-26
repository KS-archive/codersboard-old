const validate = require('utils/validate');

const createPost = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.createPost(args, info);
};

const updatePost = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.updatePost(args, info);
};

const deletePost = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.mutation.deletePost(args, info);
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
}
