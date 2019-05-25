const cookieParser = require('cookie-parser');
const multer = require('multer')();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const signale = require('signale');
const authMiddleware = require('middleware/auth');
const errorMiddleware = require('middleware/error');
const cloudinary = require('services/cloudinary');
const validate = require('utils/validate');

const corsOptions = {
  origin: process.env.CLIENT_URL,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = server => {
  server.express.use(cors(corsOptions));
  server.express.use(helmet());
  server.express.use(cookieParser());

  if (server.express.get('env') === 'development') {
    server.express.use(morgan('tiny'));
    signale.info('Morgan enabled');
  }

  server.express.use(authMiddleware);

  server.express.post('/cloudinary', multer.single('file'), async (request, response) => {
    const { file: { buffer, originalname }, body: { folder } } = request;
    await validate({ request, prisma: server.context().prisma }).userExist();
    const image = await cloudinary.upload(buffer, folder, originalname);
    response.status(200).send(image);
  });

  server.express.use(errorMiddleware);
};
