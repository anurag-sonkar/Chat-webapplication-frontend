import React, { useEffect } from 'react'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space ,Button , Avatar} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications } from '../features/notifications/notificationSlice';
import { Link } from 'react-router-dom';

function Notifications({children}) {
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.notification)
  console.log(notifications)

  useEffect(
    ()=>{
      dispatch(getAllNotifications())
    },[]
  )

 

  const items = notifications.length > 0
    ? notifications.map((notification) => ({
      key: notification._id,
      label: (
        <div className="flex items-center justify-between p-2 border-b border-gray-200 gap-4">
          {/* Avatar and Name */}
          <div className="flex items-center space-x-4">
            <Avatar size="large" src={notification.sender.avatar} />
            <span>{notification.sender.name}</span>
          </div>

          {/* Accept and Reject Buttons */}
          <div className="flex space-x-2">
            <Button type="primary" size="small">
              Accept
            </Button>
            <Button type="default" size="small" danger>
              Reject
            </Button>
          </div>
        </div>
      ),
    }))
    : [{
      key: 'no-notifications',
      label: (
        <div className="text-center p-2 text-gray-500">
          No notifications
        </div>
      )
    }];

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['hover']}
      placement="bottomRight"
      overlayStyle={{ width: '20rem' }}
    >
      <a onClick={(e) => e.preventDefault()} className="relative inline-block">
        <Space>
          {/* Bell Icon with Notification Count */}
          <div className="relative">
            {children}
            {notifications.length > 0 && (
              <span className="absolute top-0 right-1 inline-flex items-center justify-center h-5 w-5 text-sm font-semibold leading-none text-white bg-red-600 rounded-full transform translate-x-2/4 -translate-y-2/4">
                {notifications.length}
              </span>
            )}
          </div>
        </Space>
      </a>
    </Dropdown>
  )
}

export default Notifications