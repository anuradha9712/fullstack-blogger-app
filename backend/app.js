const express = require('express');
const app = express();
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const cors = require('cors')

app.use(cors());
app.use(express.static('build'));

// it takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
