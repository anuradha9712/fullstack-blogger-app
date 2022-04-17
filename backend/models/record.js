// Mongoose act as an ODM (Object Document Mapper)
const mongoose = require('mongoose')
require('dotenv').config()
const logger = require('../utils/logger');

const url = process.env.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minlength: 10
  },
  content: String,
});

Schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('UserRecord', Schema);
