const User = require('../models/user');

const totalLikes = (Blog) => {
  sum = 0;
  Blog.forEach(element => {
    sum += element.likes
  });
  return sum;
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
}

module.exports = {
  totalLikes,
  usersInDb
}
