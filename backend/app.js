const express = require('express');
const app = express();

const userRouter = require('./controllers/user');
const blogRouter = require('./controllers/blog');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('./utils/logger');
const url = process.env.MONGODB_URI

logger.info('connecting to', url);

mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  });

app.use(cors());
app.use(express.static('build'));

// it takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', middleware.tokenExtractor, blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
