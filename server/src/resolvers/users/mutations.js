const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (parent, args, ctx, info) => {
  args.email = args.email.toLowerCase();
  args.password = await bcrypt.hash(args.password, 10);

  const user = await ctx.prisma.mutation.createUser(
    {
      data: { ...args, permissions: { set: ['OWNER'] } },
    },
    info,
  );

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return user;
};

const signin = async (parent, { email, password }, ctx, info) => {
  const user = await ctx.prisma.query.user({ where: { email } });
  if (!user) {
    throw new Error(`No such user found for email ${email}`);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid Password!');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  return user;
};

const signout = (parent, args, ctx, info) => {
  ctx.response.clearCookie('token');
  return { message: 'Logged out' };
};

module.exports = {
  signup,
  signin,
  signout,
}
