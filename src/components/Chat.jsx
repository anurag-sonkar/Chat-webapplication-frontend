import React, { useEffect } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from './Message';
import MessageInput from './MessageInput';
import { useSelector } from 'react-redux';


function Chat() {
  const { selectedChat } = useSelector(state => state.chat)
  console.log(selectedChat?.members?.[0])

  
  return (
    <div className='h-full w-full'>
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
                      Anurag Sonkar
                  </div>
           </div>
           <div className='flex items-center gap-5'> {/* right div */}
                  <div className='cursor-pointer'><IoVideocam  size={26} color='gray' /></div>
                  <div className='cursor-pointer'><IoSearch size={26}  color='gray' /></div>
                  <div className='cursor-pointer'><BsThreeDotsVertical size={26}  color='gray' /></div>
           </div>
          </div>

        {/* --------------------------------------------------------------- */}
        {/* chat messages */}
          <div className='h-[80vh] w-full overflow-y-scroll px-4 py-2'>
            <Message position="start"  />
            <Message />
            <Message />
            <Message position="start"  />
            <Message />
            <Message position="start"  />
            <Message position="start"  />
            <Message />
            <Message />
            <Message position="start"  />
            <Message />
            <Message position="start"  />
          </div>

        {/* chat - input */}
          <div>
            <MessageInput />
          </div>
    </div>
  )
}

export default Chat