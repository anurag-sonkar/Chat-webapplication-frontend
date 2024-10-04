import React, { useEffect, useState } from 'react'
import Notification from '../components/Notifications';
import Card from '../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { filterChats, getAllChats } from '../features/chats/chatSlice';
import { getAllMessages } from '../features/messages/messageSlice';

const dummyCardData = [
    {
        _id: Date.now(),
        name: "Anurag Sonkar",
        email: "anuragsonkar0532gmail.com",
        bio: "can't talk whatsapp only",
        time: new Date().toLocaleTimeString(),
        status: "online",
        avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },

]

function FriendsChats() {
    const [search , setSearch] = useState("")
    const { chats , isLoading } = useSelector(state => state.chat)
    const dispatch = useDispatch()

    console.log(chats)

    useEffect(
        () => {
            dispatch(getAllChats())
        }, []
    )


    const handleGetAllMessages = (id)=>{
        dispatch(getAllMessages(id))

    }

    const handleSearchFriend = (e) => {
        const searchValue = e.target.value;
        setSearch(searchValue);

        if (searchValue.trim() === "") {
            // If search input is empty, fetch all chats again
            dispatch(getAllChats());
        } else {
            // Otherwise, filter chats based on the search value
            dispatch(filterChats(searchValue));
        }
    }


    return (
        <div>
            {/* Search input box -1 for friends only */}
            <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" value={search} onChange={handleSearchFriend}/>
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
                    !isLoading ? chats?.length > 0 && chats.map((chat, index) => {
                        {/* if (chat?.isGroupChat === false) { */}
                            return <div key={chat?._id} onClick={() => handleGetAllMessages(chat?._id)}><Card  chat={chat} /></div>
                        {/* } */}
                    }) : <div className='py-4 mr-2'>
                            <div className="flex w-full p-4 rounded-md flex-col gap-4 drop-shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                                    <div className="flex flex-col gap-4">
                                        <div className="skeleton h-2 w-48"></div>
                                        <div className="skeleton h-2 w-60"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full p-4 rounded-md flex-col gap-4 drop-shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                                    <div className="flex flex-col gap-4">
                                        <div className="skeleton h-2 w-48"></div>
                                        <div className="skeleton h-2 w-60"></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default FriendsChats