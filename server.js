// dependencies
const express = require('express');
const moment = require('moment');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');

// express
const server = express();

function logger(req, res, next) {
  console.log(
    `You used a ${req.method} request to the ${
      req.path
    } URI on ${moment().format('LLLL')}`
  );
  next();
}

// middleware etc.
server.use(logger);
server.use(helmet());
server.use(express.json());

// server
server.get('/', async (req, res) => {
  try {
    res.status(200).json({ messageOfTheDay: process.env.MOTD });
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the data.' });
  }
});

server.use('/api/users', userRouter);

module.exports = server;
