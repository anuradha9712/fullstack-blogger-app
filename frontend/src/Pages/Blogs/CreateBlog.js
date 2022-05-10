import React, { useState } from 'react';
import {
  Column,
  Row,
  Card,
  Heading,
  Label,
  Input,
  Textarea,
  Button,
  ChipInput,
  Toast
} from '@innovaccer/design-system';
import blogService from '../../services/blogs';

const CreateBlog = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tag, setTag] = React.useState(
    ['Web Development', 'Beginners', 'Full Stack']
  );

  const handleSubmit = async () => {
    const newBlog = { title, content, tag }
    await blogService.create(newBlog);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    },1000);
  }

  return (
    <>
      {/* <Row className="justify-content-center">
        <Text
          size="large"
          appearance="link"
          className='justify-content-center m-6'
        >
          Every Programmer is an Author!!
        </Text>
      </Row> */}
      <Row className="px-8 justify-content-center">
        <Column size={6} className="m-6">
          <Card className="px-6 py-6">
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
              className="p-2 mb-6"
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
              Create Blog
            </Button>
          </Card>
        </Column>
      </Row>

      {showTooltip &&
        <div className="m-8">
          <Toast appearance="info" title="Blog Successfully Created!!" />
        </div>
      }
    </>
  )
}

export default CreateBlog;
