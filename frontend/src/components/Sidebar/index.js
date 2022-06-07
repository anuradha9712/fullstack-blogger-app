import React, { useEffect, useState } from 'react';
import userService from '../../services/signup';
import { Heading, Avatar, Text, Paragraph, Divider } from '@innovaccer/design-system';

const Sidebar = () => {

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    userService.getAll().then(user => setUserList(user));
  }, []);

  return (
    <div className='m-7'>
      <Heading>Followers</Heading>
      <Divider className='my-5'/>
      {
        userList.map((user, key) => {
          return (
            <div className='d-flex my-7' key={key}>
              <Avatar className='mr-5' tooltipPosition='left'>{user.name}</Avatar>
              <div className='flex-column'>
                <Text>{user.name}</Text>
                <Paragraph appearance='subtle'>{user.username}</Paragraph>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Sidebar;
