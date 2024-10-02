import React from 'react'
import { useSelector } from 'react-redux'

function Message({chat}) {
    const {user} = useSelector(state => state.auth)

  return (
      <div className={`chat ${chat?.sender?._id === user?._id ? "chat-end" : "chat-start"}`}>
          <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                  <img
                      alt="Tailwind CSS chat bubble component"
                      src={`${chat?.sender?._id === user?._id ? user.avatar.url : chat.sender.avatar.url}`} />
              </div>
          </div>
          <div className="chat-footer">
              {/* Obi-Wan Kenobi */}
              <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">{chat?.content}</div>
          {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
  )
}

export default Message