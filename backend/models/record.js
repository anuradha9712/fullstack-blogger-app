// Mongoose act as an ODM (Object Document Mapper)
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // minlength: 10
  },
  content: String,
  tags: [{
    type: String,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

Schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('UserRecord', Schema);
