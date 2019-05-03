const winston = require('winston');
const signale = require('signale');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: `${__dirname}/../errors.log` })
  ]
});

logger.on('finish', () => process.exit(1));

process.on('uncaughtException', async (ex) => {
  logger.error(ex.message, ex);
  signale.fatal('UNCAUGHT EXCEPTION');
  signale.error(ex);
});

process.on('unhandledRejection', async (ex) => {
  logger.error(ex.message, ex);
  signale.fatal('UNHANDLED REJECTION');
  signale.error(ex);
});

signale.info('Error handlers initialized');
