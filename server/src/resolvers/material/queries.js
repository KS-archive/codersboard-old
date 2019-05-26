const validate = require('utils/validate');

const materials = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  const materials = await ctx.prisma.query.materials(args, info);
  const userCredentials = await ctx.prisma.query.user({ where: { id: ctx.request.userId } }, '{ credentials { id } }');
  const userCredentialIds = userCredentials.credentials.map(({ id }) => id);

  materials.sort((a, b) => {
    const credentialA = a.credential && a.credential.id;
    const credentialB = b.credential && b.credential.id;

    if (userCredentialIds.includes(credentialA) && !userCredentialIds.includes(credentialB)) return -1;
    if (userCredentialIds.includes(credentialB) && !userCredentialIds.includes(credentialA)) return 1;
    if (!credentialA && credentialB) return -1;
    if (!credentialB && credentialA) return 1;
    return 0;
  });

  return materials;
};

const materialTags = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  return ctx.prisma.query.materialTags(args, info);
};

module.exports = {
  materials,
  materialTags,
}
