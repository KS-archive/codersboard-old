const signale = require('signale');

module.exports = server => {
  server.start(
    {
      cors: {
        credentials: true,
        origin: process.env.CLIENT_URL,
      },
    },
    deets => {
      signale.info(`Server is now running on port ${deets.port}`);
    },
  );
};
