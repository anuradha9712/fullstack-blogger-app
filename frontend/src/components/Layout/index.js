import React from 'react';
import { Row, Column } from '@innovaccer/design-system';
import LeftNav from '../LeftNav';

const Layout = ({children}) => {
  return (
    <div>
      <Row>
        <Column size={2}>
          <LeftNav />
        </Column>

        <Column size={6}>
          {children}
        </Column>

        <Column size={3}>
          <h1>sidebar here</h1>
        </Column>
      </Row>
    </div>
  )
}

export default Layout;
