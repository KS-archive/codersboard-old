const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const validate = require('utils/validate');

const createUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  args.data.password = await bcrypt.hash(args.data.password, 10);
  return ctx.prisma.mutation.createUser(args, info);
};

const updateUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  return ctx.prisma.mutation.updateUser(args, info);
};

const deleteUser = async (parent, args, ctx, info) => {
  await validate(ctx).userHasPermission(['OWNER', 'HR']);
  return ctx.prisma.mutation.deleteUser(args, info);
};

const signIn = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.prisma.query.user({ where: { email } }, '{id permissions password special}');

  if (!user) {
    throw new Error('EMAIL_DOESNT_EXIST');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    // In case of the first owner user
    if (user.permissions.includes('OWNER') && user.special.includes('DB_USER') && user.password === password) {
      password = await bcrypt.hash(password, 10);
      const special = user.special.filter(key => key !== 'DB_USER');
      await ctx.prisma.mutation.updateUser(
        { where: { id: user.id }, data: { password, special: { set: special } } },
        info,
      );
    } else {
      throw new Error('WRONG_PASSWORD');
    }
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return user;
};

const signOut = (parent, args, ctx, info) => {
  ctx.response.clearCookie('token');
  return { message: 'Logged out' };
};

const updateProfile = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  const user = await ctx.prisma.query.user({ where: { id: ctx.request.userId } }, '{ university { id } }');

  if (user.university && !args.data.university) {
    args = { ...args, data: { ...args.data, university: { disconnect: true } } };
  }

  args = { ...args, where: { id: ctx.request.userId } };
  return ctx.prisma.mutation.updateUser(args, info);
};

const parseCodewarsData = data => ({
  name: data.username,
  honor: data.honor,
  leaderboardPosition: data.leaderboardPosition,
  score: data.ranks.overall.score,
  kyu: Math.abs(data.ranks.overall.rank),
  completedChallenges: data.codeChallenges.totalCompleted,
  languages: Object.keys(data.ranks.languages)
    .map(key => ({ lang: key, ...data.ranks.languages[key] }))
    .map(({ rank, score, lang }) => ({ name: lang, kyu: Math.abs(rank), score })),
});

const integrateCodewars = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();
  console.log(args);

  const { data } = await axios.get(
    `https://www.codewars.com/api/v1/users/${args.name}?access_key=${process.env.CODEWARS_TOKEN}`,
  );

  await ctx.prisma.mutation.createIntegration({ data: {
    user: { connect: { id: ctx.request.userId } },
    key: 'codewars',
    connector: { name: args.name },
    data: parseCodewarsData(data),
  }});

  return { message: 'SUCCESS' }
};

const detachCodewars = async (parent, args, ctx, info) => {
  await validate(ctx).userExist();

  const user = await ctx.prisma.query.user({ where: { id: ctx.request.userId } }, '{ integrations( where: { key: "codewars" } ) { id } }');
  await ctx.prisma.mutation.deleteIntegration({ where: { id: user.integrations[0].id } });

  return { message: 'SUCCESS' }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  signIn,
  signOut,
  updateProfile,
  integrateCodewars,
  detachCodewars,
};
