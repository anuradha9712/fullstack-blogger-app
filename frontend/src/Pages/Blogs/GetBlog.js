import React, { useEffect, useState } from 'react';
import {
  Icon,
  EmptyState,
  Card,
  CardHeader,
  CardBody,
  Text,
  Badge,
  Avatar,
  Divider,
  Paragraph,
  Row,
  Heading
} from '@innovaccer/design-system';
import emptyState from '../../images/emptyState.svg';
import blogService from '../../services/blogs';
import Layout from '../../components/Layout';

const ShowNoResult = () => {
  return (
    <EmptyState
      description="Write some cool stuffs here!!"
      imageSrc={emptyState}
      size='large'
      title="No blog Published :("
      className='mt-10'
    />
  )
}

const ShowBlogList = ({ blogList, onDeleteHandler, userDetails }) => {

  const tagMapper = {
    'web development': 'warning',
    'beginners': 'accent2',
    'full stack': 'success',
    'javascript': 'accent1',
    'react': 'accent3',
    'programming': 'accent4'
  }

  return (
    <div>
      {
        blogList.map(({ id, title, content, tags, user }) => {
          return (
            <div key={id}>
              <Card className='m-5'>

                <CardHeader>
                  <div className='d-flex'>
                    <Avatar className='mr-5'>{user.name}</Avatar>
                    <div className='flex-column'>
                      <Text>{user.name}</Text>
                      <Paragraph appearance='subtle'>{user.username}</Paragraph>
                    </div>
                  </div>
                  <Divider className='mt-5' />
                </CardHeader>

                <CardBody>
                  <Text size="large" weight="strong">
                    {title}
                  </Text>
                  <Paragraph className='mt-5'>{content}</Paragraph>
                  <div>
                    {tags.map((tag, key) => <Badge key={key} className='my-5 mr-5' subtle={true} appearance={tagMapper[tag.toLowerCase()]}>{tag}</Badge>)}
                  </div>
                  <Divider />
                </CardBody>

                <Row className='align-items-center'>
                  <Icon className='m-6' type='outlined' name='favorite' appearance='inverse' size={20} />
                  <Icon className='m-6' type='outlined' name='comment' appearance='inverse' size={20} />

                  {userDetails.username === user.username &&
                    <Icon
                      className='m-6 cursor-pointer'
                      onClick={() => onDeleteHandler(id)}
                      type='outlined'
                      name='delete'
                      appearance='inverse'
                      size={20}
                    />
                  }
                </Row>
              </Card>
            </div>
          )
        })
      }
    </div>
  )
}

const GetBlog = () => {

  const [blogList, setBlogList] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogList(blogs));
  }, []);

  const handleDelete = async (id) => {
    await blogService.remove(id);
    blogService.getAll().then(blogs => setBlogList(blogs))
  }

  return (
    <>
      <Layout>
        <div className="m-7">
        <Heading className='ml-5'>{`Hello ${userDetails.username} !!`}</Heading>
          {
            blogList && blogList.length === 0 ?
              <ShowNoResult />
              :
              <ShowBlogList
                blogList={blogList}
                onDeleteHandler={handleDelete}
                userDetails={userDetails}
              />
          }
        </div>
      </Layout>
    </>
  )
}

export default GetBlog;
