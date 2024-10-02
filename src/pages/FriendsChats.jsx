import React, { useEffect } from 'react'
import Notification from '../components/Notifications';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../features/chat/chatSlice';

const dummyCardData = [
    {
        _id : Date.now(),
        name: "Anurag Sonkar",
        email : "anuragsonkar0532gmail.com",
        bio: "can't talk whatsapp only",
        time: new Date().toLocaleTimeString(),
        status: "online",
        avatar : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
    
]

function FriendsChats() {
    const {chats} = useSelector(state =>state.chat)
    const dispatch = useDispatch()

    console.log(chats)

    useEffect(
        ()=>{
            dispatch(getAllChats())
        },[]
    )
    return (
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
                {
                    chats?.length > 0 && chats.map((chat,index)=>{
                        if(chat?.isGroupChat === false){
                            return <Card  key={chat?._id} {...chat?.members?.[0]}/>
                        }
                    })
                }
            </div>

        </div>
    )
}

export default FriendsChats