import React from 'react';
import { Text, Heading } from '@innovaccer/design-system';
import './index.css';
import logo from '../../images/blog3.svg';

const Header = () => {

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  return (
    <div style={{ maxHeight: '32px' }} className='position-sticky d-flex bg-light mainHeader p-6'>
      <div className='d-flex justify-content-start'>
        <Heading>{"<DeveloperBlog />"}</Heading>
      </div>
      {userDetails &&
        <div className='d-flex justify-content-end flex-grow-1'>
          {/* <Text weight='medium' className='mr-4 mt-3'>{userDetails.username}</Text> */}
          <img alt="logo" src={logo} />
        </div>
      }

    </div>
  )
}

export default Header;
