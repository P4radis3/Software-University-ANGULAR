const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config/config');
const dbConnector = require('./config/database');
const { errorHandler } = require('./utils');
const router = require('./router');

const app = express();

app.use(cors({
    origin: config.origin,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(errorHandler);

dbConnector().then(() => { app.listen(config.port, console.log(`Listening on port ${config.port}!`)); }).catch(console.error);