import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedUser, setSelectedUser } from '../features/users/userSlice';
import { useLocation } from 'react-router-dom';
import { resetSelectedChat, setFriendChat } from '../features/chats/chatSlice';

function Card({ _id, name, avatar, email }) {
    const dispatch = useDispatch()
    const { onlineUsers } = useSelector(state => state.user)
    const { pathname } = useLocation()

    const setUser = (id) => {
        if (pathname === '/chat/search-users') {
            dispatch(setSelectedUser(id))
            dispatch(resetSelectedChat())

        } else if (pathname === '/chat') {
            dispatch(setFriendChat(id))
            dispatch(resetSelectedUser())

        }
    }
    return (
        <div className='grid gap-2 mt-2 mx-1 cursor-pointer' onClick={() => setUser(_id)}>
            <div className='flex bg-[#e7f1ff]  shadow-lg py-4 justify-between px-5 items-center rounded-md '>
                <div className='flex gap-8'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            <img src={avatar?.url} />
                        </div>
                    </div>
                    <div>
                        <div className='text-2xl font-semibold'>{name}</div>
                        <div className='text-gray-600 text-xs font-semibold'>{email}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className=' '>45:00:30</div>
                    <div><div className={`w-3 h-3 rounded-full ${onlineUsers.includes(_id) ? "bg-green-700" : "bg-red-700"} float-end `}></div></div>
                </div>

            </div>
            <hr></hr>
        </div>
    )
}

export default Card