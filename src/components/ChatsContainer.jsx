import React, { Suspense, useEffect, useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import Notifications from './Notifications';
import ChatMenu from './ChatMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { Avatar, Space } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

const ChatsContainer = () => {
  // const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("chats");
  const { user } = useSelector(state => state.auth)


  const {
    token: { colorBgContainer, borderRadiusLG, colorBgLayout }, // light theme 
  } = theme.useToken();

  useEffect(() => {
    const storedSelectedKey = JSON.parse(localStorage.getItem("selectedKey"));

    if (storedSelectedKey) {
      setSelectedKey(storedSelectedKey);
    }

  }, []);



  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem("selectedKey", JSON.stringify(key));
  };

  

  return (
    <Layout className='h-screen'>
      <Sider
        trigger={null}
        collapsible
        collapsed={true}
        style={{ background: colorBgLayout, height: "100vh", backgroundColor: "#fff", borderRight: '1px solid #E3E3E3' }}  // Seting the background explicitly
      >
        {/* <div className="demo-logo-vertical" /> */}
        <div className='flex flex-col h-full py-2'>
          {/* first div */}
          <div className='flex-grow'>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={[
                {
                  key: 'chats',
                  icon: <BsFillChatSquareTextFill style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat'>Chats</Link>,
                },
                {
                  key: 'status',
                  icon: <FaCircleNotch style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat/status'>Status</Link>,
                },
                {
                  key: 'New Group',
                  icon: <MdGroupAdd style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat/create-new-group'>Create New Group</Link>,
                },
                {
                  key: 'groups',
                  icon: <MdGroups style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat/groups'>Groups</Link>,
                },
                {
                  key: 'requests',
                  icon: <FaUserFriends style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat/friend-requests'>Friend Requests</Link>,
                },
                {
                  key: 'search', 
                  icon: <MdPersonSearch style={{ fontSize: '22px' }} />,
                  label: <Link to='/chat/search-users'>Search Users</Link>,
                },
              ]}
            /></div>

          {/* second div */}
          <div className='mt-auto'>  {/* mt-auto pushes this div to the bottom */}
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
              items={[
                {
                  key: 'settings',
                  icon: <IoMdSettings style={{ fontSize: '22px' }} />,
                  label: 'Settings',
                },
                {
                  key: 'profile',
                  icon: <Avatar size={25} icon={<img src={user?.avatar?.url} className='w-25 h-25' />} />,
                  label: <Link to='/chat/profile'>Profile</Link>,
                },

              ]}
            />
          </div>
        </div>

      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: colorBgContainer,
          }}
        >
          {/* Header left section: Chats title */}
          <h1 className='text-3xl font-bold'>{selectedKey.toUpperCase()}</h1>

          {/* Header right section: Notification */}
          <div className='flex items-center space-x-4'>  {/* Flexbox to align Notification */}
            <div className='mt-5'> <Notifications ><IoIosNotifications size={35} />  </Notifications></div>
            <div className='mt-5'><ChatMenu><BsThreeDotsVertical size={30} /></ChatMenu></div>
            {/* Adjust size as needed */}
          </div>
        </Header>

        <Content
          style={{
            // margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Content */}
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatsContainer;
