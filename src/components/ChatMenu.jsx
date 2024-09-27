import React from 'react'
import { Dropdown, Space } from 'antd';

function ChatMenu({children}) {
    const items = [
        {
            label: <a href="https://www.antgroup.com">1st menu item</a>,
            key: '0',
        },
        {
            label: <a href="https://www.aliyun.com">2nd menu item</a>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item',
            key: '3',
        },
    ];
  return (
      <Dropdown
          menu={{
              items,
          }}
          trigger={['click']}
          placement="bottomRight"  
          overlayStyle={{ marginTop: '-80px' }}
      >
          <a onClick={(e) => e.preventDefault()}>
              <Space>
                  {children}
              </Space>
          </a>
      </Dropdown>
  )
}

export default ChatMenu