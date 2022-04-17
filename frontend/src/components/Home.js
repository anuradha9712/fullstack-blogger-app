import React, { useEffect, useState } from 'react';
import {
  Column,
  Row,
  Card,
  Heading,
  Label,
  Input,
  Textarea,
  Button,
  Message,
  Icon,
  EmptyState
} from '@innovaccer/design-system';
import emptyState from '../images/emptyState.svg';
import blogService from '../services/blogs';

const Home = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogList(blogs));
  }, []);

  const handleSubmit = async () => {
    const newBlog = { title, content }
    await blogService.create(newBlog);
    blogService.getAll().then(blogs => setBlogList(blogs))
  }

  const handleDelete = async (id) => {
    await blogService.remove(id);
    blogService.getAll().then(blogs => setBlogList(blogs))
  }

  return (
    <>
      <Row className="p-8">
        <Column className="m-6">
          <Card className="px-6 py-6">
            <Heading className="mb-7" size="l">Create Blog</Heading>
            <Label withInput={true}>Title</Label>
            <Input
              name="input"
              type="text"
              placeholder="Enter Title"
              className="mb-6"
              autocomplete={'off'}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Label withInput={true}>Content</Label>
            <Textarea
              aria-labelledby="Textarea"
              name="Textarea"
              placeholder="Write your content here..."
              onChange={(e) => setContent(e.target.value)}
              resize={true}
              rows={3}
            />

            <Button
              className="mt-7"
              appearance="primary"
              disabled={title === '' || content === ''}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </Column>
        <Column className="m-6">
          <Heading className="mb-7" size="l">Read Some Blogs</Heading>
          {
            blogList && blogList.length === 0 ?
              <EmptyState
                description="Write some cool stuffs here!!"
                imageSrc={emptyState}
                size="small" 
                title="No blog Published."
              />
              :
              blogList.map((blog) =>
                <div className="mt-4">
                  <Message
                    description={blog.content}
                    title={blog.title}
                    actions={
                      <>
                        <Icon
                          name="delete"
                          appearance="primary_lighter"
                          className='cursor-pointer'
                          onClick={() => handleDelete(blog.id)}
                        />
                      </>
                    }
                  />
                </div>
              )
          }
        </Column>
      </Row>
    </>
  )
}

export default Home;
