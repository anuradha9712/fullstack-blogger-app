import React, { useState } from 'react';
import {
  Card,
  Heading,
  Label,
  Input,
  Button,
  Toast
} from '@innovaccer/design-system';
import userServices from '../../services/signup';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSignup = async () => {
    const newUser = { name, username, password }
    await userServices.create(newUser);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  }

  return (
    <>
      <div className='Row justify-content-center'>
        <Card className="px-6 py-6">
          <Heading
            className="mb-7"
            size="m"
          >
            Signup
          </Heading>

          <Label withInput={true}>Username</Label>
          <Input
            name="input"
            type="text"
            placeholder="Enter Username"
            className="mb-6"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Label withInput={true}>Name</Label>
          <Input
            name="input"
            type="text"
            placeholder="Enter Name"
            className="mb-6"
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />

          <Label withInput={true}>Password</Label>
          <Input
            name="input"
            type="password"
            placeholder="Enter Password"
            className="mb-6"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="mt-7"
            appearance="primary"
            disabled={username === '' || password === '' || name === ''}
            onClick={handleSignup}
          >
            Signup
          </Button>
        </Card>
      </div>

      {showTooltip &&
        <div className="m-8">
          <Toast appearance="info" title="User Successfully Created!!" />
        </div>
      }
    </>
  )
}

export default Signup;
