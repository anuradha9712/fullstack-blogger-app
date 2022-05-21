const totalLikes = (Blog) => {
  sum = 0;
  Blog.forEach(element => {
    sum += element.likes
  });
  return sum;
}

module.exports = {
  totalLikes
}
