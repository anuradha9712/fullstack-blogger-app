import React from 'react';
import { NavLink } from 'react-router-dom';
import { Heading, Icon } from '@innovaccer/design-system';
import './index.css';

const LeftNav = () => {

  const navLinkStyle = ({ isActive }) => {
    // return isActive ? `bg-dark` : `bg-primary`;
  };
 
  const navList = [
    { name: 'My Feed', icon: 'books', path: '/home' },
    { name: 'Profile', icon: 'person', path: '/home' },
    { name: 'Create Blog', icon: 'create', path: '/create' },
    { name: 'Login', icon: 'login', path: '/login' },
    { name: 'Sign Up', icon: 'close', path: '/signup' }
  ];

  return (
    <div className='d-flex flex-column p-5'>
      {
        navList.map((nav, key) => {
          return (
            <NavLink key={key} to={nav.path} 
            className='p-5'
            // className={navLinkStyle}
            >
              <div className='Row align-items-center'>
                <Icon size={20} appearance='primary' name={nav.icon} className='mr-5'></Icon>
                <Heading size='m' className='navlink'>{nav.name}</Heading>
              </div>
            </NavLink>
          )
        })
      }
    </div>
  )
}

export default LeftNav;
