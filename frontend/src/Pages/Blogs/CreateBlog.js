import React, { useState } from 'react';
import {
  Card,
  Heading,
  Label,
  Input,
  Textarea,
  Button,
  ChipInput,
  Text
} from '@innovaccer/design-system';
import blogService from '../../services/blogs';
import Layout from '../../components/Layout';
import Notification from '../../components/Notification';

const CreateBlog = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');
  const [tag, setTag] = React.useState(
    ['Web Development', 'Beginners', 'Full Stack']
  );

  const handleSubmit = async () => {
    const newBlog = { title, content, tag }
    const result = await blogService.create(newBlog);
    if (result?.data) {
      setMessage('Blog Successfully Created!!');
    } else {
      setMessage('Some Error Occurred!!');
    }
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  }

  return (
    <>
      <Layout>
        <div>
          {/* <Text
            size="large"
            appearance="link"
            className='justify-content-center d-flex m-6'
          >
            Write Some Cool Stuffs Here!!
          </Text> */}
          <div className='d-flex justify-content-center m-6'>
            <Card className="p-6">
              <Heading
                className="mb-7"
                size="m"
              >
                Create Blog
              </Heading>

              <Label withInput={true}>Title</Label>
              <Input
                name="input"
                type="text"
                placeholder="Enter Title"
                className="mb-6"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
              />

              <Label withInput={true}>Popular Tags</Label>
              <ChipInput
                value={tag}
                chipOptions={{ clearButton: true }}
                onChange={setTag}
                className="p-4 mb-6"
              />

              <Label withInput={true}>Content</Label>
              <Textarea
                aria-labelledby="Textarea"
                name="Textarea"
                placeholder="Write your content here..."
                onChange={(e) => setContent(e.target.value)}
                resize={true}
                rows={5}
              />

              <Button
                className="mt-7"
                appearance="primary"
                disabled={title === '' || content === ''}
                onClick={handleSubmit}
              >
                Create Blog
              </Button>
            </Card>
          </div>
          {showTooltip && <Notification message={message} />}
        </div>
      </Layout>
    </>
  )
}

export default CreateBlog;
