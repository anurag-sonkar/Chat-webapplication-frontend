import React, { useEffect, useRef, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import Message from './Message';
import MessageInput from './MessageInput';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setTypingUser } from '../features/messages/messageSlice';
import Loading from './Loading';
const socket = io('http://192.168.43.195:8000')
import { format, isToday, isYesterday } from 'date-fns'; // For date formatting
import Preview from './Preview';
import { RxCross2 } from 'react-icons/rx';
import { clearPreview } from '../features/previews/previewSlice';

function Chat() {
  const [id , setId] = useState('') // selected user / group
  const [name , setName] = useState('')
  const [avatar , setAvatar] = useState('')
  const [email , setEmail] = useState('')
  const [admin , setAdmin] = useState({}) // in case of group , store full obj admin details

  const messageEndRef = useRef(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false) // used in message input
  const { selectedChat } = useSelector(state => state.chat)
  const { messages, typingUser , isLoading} = useSelector(state => state.message)
  const { user } = useSelector(state => state.auth)
  const {preview} = useSelector(state =>state.preview)
  const [loading , setLoading] = useState(false) // show when attchment is sending
  const dispatch = useDispatch()
  // console.log(selectedChat?.members?.[0])
  // console.log(messages)

  // Scroll to the bottom when new messages arrive
  // my code ***************************************
  // useEffect(() => {
  //   if (messageEndRef.current) {
  //     messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }, [preview,messages, typingUser, selectedChat]) // This will trigger when messages change

  // chat gpt - suggestion ***********************************
  // Scroll to the bottom when new messages arrive or preview is added
  useEffect(() => {
    // Ensure DOM is fully updated before scrolling
    setTimeout(() => {
      if (messageEndRef.current) {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure the DOM is updated
  }, [messages, preview, typingUser, selectedChat]); // Trigger scroll on all key state changes


  // typing
  useEffect(() => {
    // Listen for typing event
    socket.on("displayTyping", (data) => {
      // console.log(data)
      dispatch(setTypingUser(data))

    });

    // Listen for stop typing event
    socket.on("removeTyping", (data) => {
      dispatch(setTypingUser(null))
    });

    // Cleanup on component unmount
    return () => {
      socket.off("displayTyping");
      socket.off("removeTyping");
    };
  }, []);

  // Helper function to format message dates
  const formatDate = (date) => {
    if (isToday(new Date(date))) {
      return 'Today';
    } else if (isYesterday(new Date(date))) {
      return 'Yesterday';
    } else {
      return format(new Date(date), 'dd/MM/yyyy');
    }
  };


  // id , name  , avatar - based on selected chat is group / single user
  useEffect(
    () => {
      const isGroupChat = selectedChat?.isGroupChat

      // user chat
      if (!isGroupChat) {
        setName(selectedChat?.members?.[0]?.name || '')
        setId(selectedChat?.members?.[0]?._id || '')
        setEmail(selectedChat?.members?.[0]?.email || '')
        setAvatar(selectedChat?.members?.[0]?.avatar?.url || '')
        setAdmin({})

      } else { // group chat
        setName(selectedChat?.name || '')
        setEmail('')
        setId(selectedChat?._id)
        setAvatar(selectedChat?.avatar?.url)
        setAdmin(selectedChat?.groupAdmin)
      }
    }, [selectedChat] // as props
  )

  return (
    <div className='h-full w-full  border-l'>
      {/* chat - header */}
      <div className='flex justify-between bg-[#F0F2F5] px-4 py-2 items-center' onClick={() => setShowEmojiPicker(false)}>
        <div className='flex items-center gap-4'> {/* left div */}
          {/* avatar */}
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={avatar} />
            </div>
          </div>
          {/*name */}
          <div className=''>
            <div className='flex items-end gap-2'>
              <div className='text-2xl font-semibold'>
                {name}
              </div>
              {/* {
                admin && <div className='text-[10px]'>{admin?.name + ''}</div>
              } */}
            </div>
            <div className='text-xs'>
              {typingUser === user?._id && "typing..."}
            </div>
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
      <div className='h-[80vh] w-full bg-white overflow-y-scroll px-4 py-2' onClick={() => setShowEmojiPicker(false)}>
        {
          messages?.length > 0 && messages.map((message, index) => {
            const showDateHeader = index === 0 || formatDate(messages[index - 1]?.createdAt) !== formatDate(message?.createdAt);
            return (
              <div key={message?._id}>
                {showDateHeader && (
                  <div className="text-center my-2 text-gray-500">
                    {formatDate(message?.createdAt)}
                  </div>
                )}
                <Message chat={message} />
              </div>
            )
          })
        }
        
        
      {/* preview when availble */}
         {/* {
          preview && <div className='p-4 min-h-16 bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
            <div><RxCross2 size={30}/></div>
            <div><Preview /></div>
          {isLoading && <Loading />}
          </div>
         } */}
        {
          preview && (
            <div className='preview-bg relative p-4 min-h-16 bg-blue-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
              <div className='absolute top-0 right-0 p-2 cursor-pointer'>
                <RxCross2 size={30} onClick={() => dispatch(clearPreview())}/>
              </div>
              <Preview />
              {/* Loading visibility */}
              {loading && (
                <div className="flex justify-center items-center mt-2">
                  <Loading /> {/* Ensure Loading has proper styles and visibility */}
                </div>
              )}
            </div>
          )
        }

        <div ref={messageEndRef} className='relative h-6'>
          {typingUser === user?._id && <Loading />}
        </div> {/* scroll till bottom message */}

      </div>


      {/* chat - input */}
      <div>
        <MessageInput showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker} setLoading={setLoading}/>
      </div>
    </div>
  )
}

export default Chat