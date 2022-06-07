import React, { useState } from 'react';
import {
  Card,
  Heading,
  Label,
  Input,
  Button,
  Icon,
  Row,
  Column,
  Link
} from '@innovaccer/design-system';
import loginServices from '../../services/login';
import Notification from '../../components/Notification';
import { useNavigate } from "react-router-dom";
import logo from '../../images/login.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [message, setMessage] = useState('');

  let navigate = useNavigate();

  const handleLogin = async (newUser) => {
    const result = await loginServices.create(newUser);
    if (result?.data) {

      localStorage.setItem('userDetails', JSON.stringify(result.data));
      navigate('/home');

    } else {
      setMessage('Incorrect Username or Password');
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }
  }

  const handleSubmit = () => {
    const newUser = { username, password }
    handleLogin(newUser);
  }

  const handleTestUser = () => {
    setUsername('anuradha');
    setPassword('anuradha');
    const newUser = { username: 'anuradha', password: 'anuradha' }
    handleLogin(newUser);
  }

  return (
    <>
      <Row className='p-8'>
        {/* <Column className='d-flex align-items-center justify-content-center'>
          <Icon>
            <img alt="logo" src={logo} className="w-100" />
          </Icon>
        </Column> */}
        <Column className='d-flex align-items-center justify-content-center'>
          <div>
            <Card className="p-8 w-100">
              <Heading
                className="mb-7"
                size="m"
              >
                Login
              </Heading>

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

              <Button
                className="mt-7"
                appearance="primary"
                disabled={username === '' || password === ''}
                onClick={handleSubmit}
              >
                Login
              </Button>

              <Button
                className="mt-7"
                appearance="primary"
                onClick={handleTestUser}
              >
                Test Credentials
              </Button>

              <Label className='mt-7'>Don't have an account ?</Label>
              <Link href='/signup' className='ml-3'>Sign Up</Link>
            </Card>

          </div>
        </Column>
      </Row>
      {showTooltip && <Notification message={message} />}
    </>
  )
}

export default Login;
