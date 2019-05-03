require('dotenv').config();
require('express-async-errors');
require('./startup/logging');


const server = require('./startup/createServer')();
require('./startup/middleware')(server);
require('./startup/runServer')(server);
