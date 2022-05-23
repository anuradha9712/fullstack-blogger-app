require('dotenv').config();
const app = require('./app'); // the actual Express application
const http = require('http');
const logger = require('./utils/logger');
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
});
