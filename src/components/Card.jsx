import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedUser, setSelectedUser } from '../features/users/userSlice';
import { useLocation } from 'react-router-dom';
import { resetSelectedChat, setFriendChat } from '../features/chats/chatSlice';
import { resetSelectedGroup } from '../features/groups/groupSlice';
import { format } from 'date-fns'; // For date formatting

function Card({ _id, name, avatar, email, createdAt }) {
    const dispatch = useDispatch()
    const { onlineUsers } = useSelector(state => state.user)
    const { selectedChat } = useSelector(state => state.chat)
    const { pathname } = useLocation()

    const setUser = (id) => {
        if (pathname === '/chat/search-users') {
            dispatch(setSelectedUser(id))
            dispatch(resetSelectedChat())
            dispatch(resetSelectedGroup())
            
        } else if (pathname === '/chat') {
            dispatch(setFriendChat(id))
            dispatch(resetSelectedUser())
            dispatch(resetSelectedGroup())

        }
    }
    return (
        <div className='grid gap-2 mt-2 mx-1 cursor-pointer' onClick={() => setUser(_id)}>
            <div className={`transition-all ease-in-out duration-150  hover:bg-[#22313f] hover:text-white rounded-md flex py-4 justify-between px-5 items-center ${selectedChat?.members?.[0]._id === _id ? "bg-[#005792] text-white" : "shadow-md shadow-gray-500"}`}>
                <div className='flex gap-8'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            <img src={avatar?.url} />
                        </div>
                    </div>
                    <div>
                        <div className='text-2xl font-semibold'>{name}</div>
                        <div className='text-xs font-semibold'>{email}</div>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <div className='text-xs font-semibold'>{format(new Date(createdAt), 'dd/MM/yyyy')}</div>
                    <div className=''>{onlineUsers?.includes(_id) ? <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/40C057/full-stop--v1.png" alt="full-stop--v1" /> : <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/FA5252/full-stop--v1.png" alt="full-stop--v1" />}</div>
                </div>

            </div>
            <hr></hr>
        </div>
    )
}

export default Card