import React, { useEffect, useState } from 'react';
import {
  Icon,
  EmptyState,
  Card,
  CardHeader,
  CardBody,
  CardSubdued,
  Text,
  Badge,
} from '@innovaccer/design-system';
import emptyState from '../../images/emptyState.svg';
import blogService from '../../services/blogs';
import Layout from '../../components/Layout';

const ShowNoResult = () => {
  return (
    <EmptyState
      description="Write some cool stuffs here!!"
      imageSrc={emptyState}
      size="small"
      title="No blog Published."
    />
  )
}

const ShowBlogList = ({ blogList, onDeleteHandler }) => {

  const tagMapper = {
    'Web Development': 'primary',
    'Beginners': 'accent2',
    'Full Stack': 'success'
  }

  return (
    <div>
      {
        blogList.map(({ id, title, content, tags }) => {
          return (
            <div key={id}>
              <Card className="m-5">
                <CardHeader>
                  <Text size="large" weight="strong">
                    {title}
                  </Text>
                </CardHeader>
                <CardBody>
                  <div>
                    {content}
                  </div>
                  <div>
                    {tags.map((tag, key) => <Badge key={key} className='m-2' appearance={tagMapper[tag]}>{tag}</Badge>)}
                  </div>
                </CardBody>
                <CardSubdued border="top">
                  <Icon
                    name="delete"
                    appearance="alert"
                    className='cursor-pointer'
                    onClick={() => onDeleteHandler(id)}
                  />
                </CardSubdued>
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
        <div className="m-10">
          {
            blogList && blogList.length === 0 ?
              <ShowNoResult />
              :
              <ShowBlogList blogList={blogList} onDeleteHandler={handleDelete} />
          }
        </div>
      </Layout>
    </>
  )
}

export default GetBlog;
