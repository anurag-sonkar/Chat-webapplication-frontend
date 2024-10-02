import React, { useEffect, useRef } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from './Message';
import MessageInput from './MessageInput';
import { useSelector } from 'react-redux';


function Chat() {
  const messageEndRef = useRef(null)
  const { selectedChat } = useSelector(state => state.chat)
  // console.log(selectedChat?.members?.[0])
  const { messages } = useSelector(state => state.message)
  console.log(messages)

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages]) // This will trigger when messages change


  return (
    <div className='h-full w-full  border-l'>
      {/* chat - header */}
      <div className='flex justify-between bg-[#F0F2F5] px-4 py-2 items-center'>
        <div className='flex items-center gap-4'> {/* left div */}
          {/* avatar */}
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={selectedChat?.members?.[0]?.avatar?.url} />
            </div>
          </div>
          {/*name */}
          <div className='text-lg font-semibold'>
            {selectedChat?.members?.[0]?.name}
          </div>
        </div>
        <div className='flex items-center gap-5'> {/* right div */}
          <div className='cursor-pointer'><IoVideocam size={26} color='gray' /></div>
          <div className='cursor-pointer'><IoSearch size={26} color='gray' /></div>
          <div className='cursor-pointer'><BsThreeDotsVertical size={26} color='gray' /></div>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* chat messages */}
      <div className='h-[80vh] w-full bg-white overflow-y-scroll px-4 py-2'>
        {
          messages?.length > 0 && messages?.map((message, index) => <Message key={message?._id} chat={message} />)
        }
        <div ref={messageEndRef}></div> {/* scroll till bottom message */}

      </div>

      {/* chat - input */}
      <div>
        <MessageInput />
      </div>
    </div>
  )
}

export default Chat