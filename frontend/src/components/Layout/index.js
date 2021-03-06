import React from 'react';
import { Row, Column } from '@innovaccer/design-system';
import LeftNav from '../LeftNav';
import Sidebar from '../Sidebar';
import './index.css';

const Layout = ({ children }) => {
  return (
    <Row className='h-100'>
      <Column size={3}>
        <LeftNav />
      </Column>

      <Column size={6} className='border-left border-right main-container'>
        {children}
      </Column>

      <Column size={3}>
        <Sidebar />
      </Column>
    </Row>
  )
}

export default Layout;
