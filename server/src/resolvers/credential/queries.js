const validate = require('../../utils/validate');

const credentials = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER']);
  return ctx.prisma.query.credentials(args, info);
};

module.exports = {
  credentials,
}
