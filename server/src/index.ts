import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';

require('dotenv').config();
import createServer from './createServer';
import prisma from './prisma';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: object;
    }
  }
}

const server = createServer();
server.express.use(cookieParser());
server.express.use(async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) return next();

    const user = await prisma.query.user(
      { where: { id: userId } },
      '{ id, permissions, ownerOf, adminOf, memberOf, guestOf }',
    );

    req.user = user || null;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port ${deets.port}`);
  },
);
