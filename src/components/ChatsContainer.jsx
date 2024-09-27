import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { FaCircleNotch } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import Notification from './Notifications';
import Notifications from './Notifications';
import ChatMenu from './ChatMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { Avatar, Space } from 'antd';
import Card from './Card';

{/* <div className="avatar">
  <div className="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div> */}

const { Header, Sider, Content } = Layout;

const ChatsContainer = () => {
  // const [collapsed, setCollapsed] = useState(true);
  const [selectedKey, setSelectedKey] = useState("chats");

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
                  label: 'Chats',
                },
                {
                  key: 'status',
                  icon: <FaCircleNotch style={{ fontSize: '22px' }} />,
                  label: 'Status',
                },
                {
                  key: 'groups',
                  icon: <MdGroups style={{ fontSize: '22px' }} />,
                  label: 'groups',
                },
                {
                  key: 'requests',
                  icon: <FaUserFriends style={{ fontSize: '22px' }} />,
                  label: 'friend requests',
                },
                {
                  key: 'search',
                  icon: <MdPersonSearch style={{ fontSize: '22px' }} />,
                  label: 'Search',
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
                  key: 'avatar',
                  icon: <Avatar size={25} icon={<img src='https://avatar.iran.liara.run/public/4' className='w-25 h-25' />} />,
                  label: 'Avatar',
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
          <h1 className='text-3xl font-bold'>Chats</h1>

          {/* Header right section: Notification */}
          <div className='flex items-center space-x-4'>  {/* Flexbox to align Notification */}
            <div className='mt-5'> <Notifications ><IoIosNotifications size={24} />  </Notifications></div>
            <div className='mt-5'><ChatMenu><BsThreeDotsVertical size={24} /></ChatMenu></div>
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
          <div>
          {/* Search input box -1 for friends only */}
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>
            </label>

            {/* Chat card */}
            <div className='custom-scrollbar'>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChatsContainer;
