import React, { useState, useRef, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'
import { FaFaceSmile } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from '../features/messages/messageSlice';
import { io } from 'socket.io-client';
const socket = io('http://192.168.43.195:8000')
import EmojiPicker from 'emoji-picker-react';
import { GrAttachment } from 'react-icons/gr';
import MessageAttachments from './MessageAttachments';


function MessageInput({ showEmojiPicker, setShowEmojiPicker }) {
    const [open, setOpen] = useState(true);
    const [message, setMessage] = useState('')
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false) -- moving to parent component inorder to close emoji when click on body
    const { selectedChat } = useSelector(state => state.chat)
    const dispatch = useDispatch()

    const [isTyping, setIsTyping] = useState(false);
    const typingTimeout = useRef(null)

    const handleMessageInput = (e) => {
        const message = e.target.value
        setMessage(message)

        // Emit typing event if user types
        if (message.length > 0 && !isTyping) {
            setIsTyping(true)
            socket.emit("typing", { userId: selectedChat?.members?.[0]?._id })
        }

        // Clear any existing timeout to reset the delay for stop typing event
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }

        // Set a timeout to emit stopTyping after 2 seconds of no typing
        typingTimeout.current = setTimeout(() => {
            setIsTyping(false)
            socket.emit("stopTyping", { userId: selectedChat?.members?.[0]?._id })
        }, 2000) // time delay after which typing... stop display when no key press
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message.trim() === '') return // Prevent sending empty messages
        const messagePromise = dispatch(sendMessage({ chatId: selectedChat?._id, content: message })).unwrap()
        messagePromise.then(() => setMessage(""))

        // Emit stopTyping immediately after sending the message
        setIsTyping(false)
        socket.emit("stopTyping", { userId: selectedChat?.members?.[0]?._id })
    }

    const handleEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji); // Add emoji to message
    };

    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (typingTimeout.current) {
                clearTimeout(typingTimeout.current)
            }
        }
    }, [])



    return (
        <form className='bg-[#F0F2F5] flex items-center px-4 py-2' onSubmit={handleSendMessage} >
            <div className='flex gap-3 pr-2'>
                <div className='relative cursor-pointer' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <FaFaceSmile size={25} />
                    {showEmojiPicker && (
                        <div className="absolute bottom-10">
                            <EmojiPicker onEmojiClick={handleEmojiClick} /> {/* Emoji Picker Component */}
                        </div>
                    )}
                </div>
                {/* message attachmnets */}
                
                {/* <div className='cursor-pointer'><GrAttachment size={25} /></div> */}
                <div className=''><MessageAttachments/></div>
            </div>

            <div className='w-full relative'>
                <input type='text' placeholder='Send your messsage...' className='border text-sm rounded-lg block w-full p-3 border-zinc-500 ' value={message} onChange={handleMessageInput} />
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-3'>
                    <IoSend size={25} />
                </button>
            </div>
        </form>
    )
}

export default MessageInput