import React, { useState } from 'react';
import {
  Card,
  Heading,
  Label,
  Input,
  Button,
  Row,
  Column,
  Icon,
  Link
} from '@innovaccer/design-system';
import logo from '../../images/login.svg';
import userServices from '../../services/signup';
import Notification from '../../components/Notification';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    const newUser = { name, username, password }
    const result = await userServices.create(newUser);
    console.log('result', result);
    if (result?.data) {
      setMessage('Account Successfully Created!!');
      navigate('/login');
    } else {
      setMessage('Error: Username must be unique!!');
    }
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  }

  const checkDisabled = () => {
    return username === '' || password === '' || name === '' || password !== confirmPassword;
  }

  return (
    <>
      <Row className='p-8'>
        <Column className='d-flex align-items-center justify-content-center'>
          <Icon>
            <img alt="logo" src={logo} className="w-100" />
          </Icon>
        </Column>
        <Column className='d-flex align-items-center justify-content-center'>
          <div>
            <Card className="p-8 w-100">
              <Heading className="mb-7" size="m">
                Sign Up
              </Heading>

              <Label withInput={true} className='mb-5'>Name</Label>
              <Input
                name="input"
                type="text"
                placeholder="Enter Name"
                className="mb-6"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />

              <Label withInput={true} className='mb-5'>Username</Label>
              <Input
                name="input"
                type="text"
                placeholder="Enter Username"
                className="mb-6"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <Label withInput={true} className='mb-5'>Password</Label>
              <Input
                name="input"
                type="password"
                placeholder="Enter Password"
                className="mb-6"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Label withInput={true} className='mb-5'>Re-Enter Password</Label>
              <Input
                name="input"
                type="password"
                placeholder="Enter Password"
                className="mb-6"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                className="mt-7"
                appearance="primary"
                disabled={checkDisabled()}
                onClick={handleSignup}
              >
                Sign Up
              </Button>

              <Label className='mt-7'>Already have an account ?</Label>
              <Link href='/login' className='ml-3'>Login</Link>
            </Card>
          </div>
        </Column>
      </Row>

      {showTooltip && <Notification message={message} />}
    </>
  )
}

export default Signup;
