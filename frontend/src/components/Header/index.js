import React from 'react';
import './index.css';

const Header = () => {

  return (
    <div className='position-sticky d-flex bg-light mainHeader p-6'>
      <div className='d-flex justify-content-start'>logo</div>
      <div className='d-flex justify-content-end'>logout</div>
    </div>
  )
}

export default Header;
