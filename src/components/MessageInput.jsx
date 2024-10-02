import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { FaFaceSmile } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux'
// import { sendMessage } from '../features/messages/messageSlice'

function MessageInput() {
    const [message , setMessage] = useState('')
    const { selectedChat } = useSelector(state => state.chat)


    // const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleSendMessage = (e)=>{
        e.preventDefault()
        if (message.trim() === '') return // Prevent sending empty messages
        // const messagePromise = dispatch(sendMessage({id : selectedUser?._id , message})).unwrap()
        messagePromise.then(() => setMessage(""))

    }

    return (
        <form className='bg-[#F0F2F5] flex items-center px-4 py-2' onSubmit={handleSendMessage} >
            <div className='flex gap-3 pr-2'>
                <div className='cursor-pointer'><FaFaceSmile size={25} /></div>
                <div className='cursor-pointer'><FaPlus size={25} /></div>
            </div>

            <div className='w-full relative'>
                <input type='text' placeholder='Send your messsage...' className='border text-sm rounded-lg block w-full p-3 border-zinc-500 ' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-3'>
                    <IoSend size={25} />
                </button>
            </div>
        </form>
    )
}

export default MessageInput