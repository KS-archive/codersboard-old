const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const signale = require('signale');
const authMiddleware = require('../middleware/auth');
const errorMiddleware = require('../middleware/error');

module.exports = server => {
  server.express.use(helmet());
  server.express.use(cookieParser());

  if (server.express.get('env') === 'development') {
    server.express.use(morgan('tiny'));
    signale.info('Morgan enabled');
  }

  server.express.use(authMiddleware);
  server.express.use(errorMiddleware);
};
