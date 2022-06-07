import React from 'react';
import { NavLink } from 'react-router-dom';
import { Divider, Icon, Pills, Text } from '@innovaccer/design-system';
import './index.css';

const LeftNav = () => {

  const navLinkStyle = ({ isActive }) => {
    // return isActive ? `bg-dark` : `bg-primary`;
  };

  const navList = [
    { name: 'My Feed', icon: 'books', path: '/home' },
    { name: 'Profile', icon: 'person', path: '/home' },
    { name: 'Create', icon: 'create', path: '/create' },
    { name: 'Login', icon: 'login', path: '/login' },
  ];

  const tagList = [
    {name: 'Web Development', count: '10'},
    {name: 'Full Stack', count: '55'},
    {name: 'Beginners', count: '99+'},
    {name: 'Javascript', count: '100'},
    {name: 'React', count: '88'},
    {name: 'Programming', count: '200+'}
  ]

  return (
    <div className='d-flex flex-column p-5'>
      {
        navList.map((nav, key) => {
          return (
            <NavLink
              key={key}
              to={nav.path}
              className='p-4'
            >
              <div className='Row align-items-center'>
                <Icon type='outlined' size={20} appearance='inverse' name={nav.icon} className='mr-5'></Icon>
                <Text size='large' weight='medium'>{nav.name}</Text>
              </div>
            </NavLink>
          )
        })
      }
      <Divider className='m-5' />
      <div>
        <Text className='p-4' appearance='subtle' size='large' >Trending Tags</Text>
        <br/>
        <div className='mt-4'>
        {
          tagList.map((tag, key) => {
            return (
              <div className='d-flex align-items-center p-4 tags' key={key}>
                <Icon type='outlined' size={20} appearance='subtle' name='tag' className='mr-5'></Icon>
                <Text appearance='subtle' size='regular' >{tag.name}</Text>
                <Pills className='ml-5' appearance='primary' subtle={true}>{tag.count}</Pills>
              </div>
            )
          })
        }
        </div>

    </div>
    </div>
  )
}

export default LeftNav;
