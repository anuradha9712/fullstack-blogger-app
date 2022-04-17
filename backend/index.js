require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');

// it takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

app.use('/blog', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  logger.info(`server is running at port ${PORT}`);
});
