global.__basedir = __dirname;
require('dotenv').config()

const dataBaseConnection = require('./config/db');
const apiRouter = require('./router');
const cors = require('cors');
const { errorHandler } = require('./utils');

dataBaseConnection().then(() => {
  const config = require('./config/config');

  const app = require('express')();
  require('./config/express')(app);

  app.use(cors({ origin: config.origin, credentials: true }));
  app.use('/api', apiRouter);
  app.use(errorHandler);
  app.listen(config.port, console.log(`Listening on port ${config.port}`));

}).catch(console.error);