import React, { useEffect, useState } from 'react';
import {
  Column,
  Row,
  Heading,
  Message,
  Icon,
  EmptyState
} from '@innovaccer/design-system';
import emptyState from '../../images/emptyState.svg';
import blogService from '../../services/blogs';

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
      <div className="p-7 m-6">
        {/* <Heading className="mb-7" size="l">Read Some Blogs</Heading> */}
        {
          blogList && blogList.length === 0 ?
            <EmptyState
              description="Write some cool stuffs here!!"
              imageSrc={emptyState}
              size="small"
              title="No blog Published."
            />
            :
            <Row className="justify-content-center">
              {
                blogList.map((blog) =>
                  <Column size={3} className="mt-4 mx-4">
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
                  </Column>
                )
              }
            </Row>
        }
      </div>
    </>
  )
}

export default GetBlog;
