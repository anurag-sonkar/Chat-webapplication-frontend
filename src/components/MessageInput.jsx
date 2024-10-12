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
import axios from 'axios';
import { clearPreview } from '../features/previews/previewSlice';


function MessageInput({ showEmojiPicker, setShowEmojiPicker , setLoading }) {
    const [open, setOpen] = useState(false); // open/close attachment
    const [message, setMessage] = useState('')
    // const [showEmojiPicker, setShowEmojiPicker] = useState(false) -- moving to parent component inorder to close emoji when click on body
    const { selectedChat } = useSelector(state => state.chat)
    const { isLoading } = useSelector(state => state.message)
    const dispatch = useDispatch()

    const [isTyping, setIsTyping] = useState(false);
    const typingTimeout = useRef(null)

    const [attachments , setAttachments] = useState([]) // img,video,audio,file
    console.log(attachments)

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

    const handleSendMessage = async(e) => {
        e.preventDefault()
        setLoading(true)
        let sendAttachments;
        if(attachments.length > 0 ){
            const data = new FormData();
            data.append('file', attachments[0]);  // Use 'file' for Cloudinary
            data.append('upload_preset', 'attachments');  // Replace with your preset

            try {
                const res = await axios.post('https://api.cloudinary.com/v1_1/dj6iduopf/auto/upload', data);

                // Log and return Cloudinary response data (URL, public_id)
                console.log(res.data);
                // return {
                //     url: res.data.secure_url, // Cloudinary file URL
                //     public_id: res.data.public_id, // Cloudinary file ID
                // };
                sendAttachments = {
                        url: res.data.secure_url, // Cloudinary file URL
                        public_id: res.data.public_id, // Cloudinary file ID

                }
                setLoading(false)
            } catch (error) {
                console.error("Error uploading to Cloudinary: ", error);
                throw error; // Re-throw to handle error in the caller function
                setLoading(false)
            }
            
            dispatch(clearPreview())
            setLoading(false)
        }

        if (message.trim() === '' && attachments.length <= 0) return // Prevent sending empty messages
        const messagePromise = dispatch(sendMessage({ chatId: selectedChat?._id, content: message, attachments: sendAttachments })).unwrap()
        messagePromise.then(() => setMessage(""))

        // Emit stopTyping immediately after sending the message
        setIsTyping(false)
        socket.emit("stopTyping", { userId: selectedChat?.members?.[0]?._id })
    }

    const handleEmojiClick = (emojiObject) => {
        if(isLoading) return
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
                <div className=''><MessageAttachments setAttachments={setAttachments} open={open} setOpen={setOpen} /></div>
            </div>

            <div className='w-full relative'>
                <input type='text' placeholder='Send your messsage...' className='border text-sm rounded-lg block w-full p-3 border-zinc-500 ' value={message} onChange={handleMessageInput} disabled={isLoading}/>
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-3' disabled={isLoading}>
                    <IoSend size={25} />
                </button>
            </div>
        </form>
    )
}

export default MessageInput