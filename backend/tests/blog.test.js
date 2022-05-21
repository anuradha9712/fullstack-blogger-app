const helperFn = require('../utils/helpers');

const listWithOneBlog = [
  {
    title: 'blog 1',
    author: 'anu',
    likes: 5,
  }
];

const listWithManyBlog = [
  {
    title: 'blog 1',
    author: 'anu',
    likes: 5,
  },
  {
    title: 'blog 2',
    author: 'radha',
    likes: 10,
  }
]

describe('test for totalLikes', () => {

  test('when list has only one blog', () => {
    const result = helperFn.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has only many blog', () => {
    const result = helperFn.totalLikes(listWithManyBlog);
    expect(result).toBe(15);
  });

});
