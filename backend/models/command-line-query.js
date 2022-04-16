const mongoose = require('mongoose')
const mongoInstance = require('./record')

if (process.argv.length < 3) {
  console.log('Please provide the enough details');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// Fetch record from database
if (process.argv.length === 3) {
  mongoInstance.find({}).then(result => {
    result.forEach(item => {
      console.log('====item====', item);
    })
    mongoose.connection.close()
  });
} else {
  // Create Record into database
  const record = new mongoInstance({
    name: name,
    number: number
  });

  record.save().then(result => {
    console.log('result---->', result);
    mongoose.connection.close();
  });
}
