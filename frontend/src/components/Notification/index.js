import React from 'react';
import { Toast } from '@innovaccer/design-system';
import './index.css';

const Notification = ({ message }) => {
  return (
    <div className="m-8 toast position-absolute">
      <Toast appearance='info' title={message} />
    </div>
  )
}

export default Notification;
