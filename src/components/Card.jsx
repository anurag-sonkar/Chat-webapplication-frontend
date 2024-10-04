import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetSelectedUser, setSelectedUser } from '../features/users/userSlice';
import { useLocation } from 'react-router-dom';
import { resetSelectedChat, setFriendChat } from '../features/chats/chatSlice';

function Card({ chat }) {
    console.log(chat)
    const [name, setName] = useState('')
    const [id, setId] = useState('') // userId -> if userChat , groupId -> if gp chat
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [totalGroupMembers, setTotalGroupMembers] = useState(null)

    const dispatch = useDispatch()
    const { onlineUsers } = useSelector(state => state.user)
    const { pathname } = useLocation()

    const setUser = (id) => {
        if (pathname === '/chat/search-users') {
            dispatch(setSelectedUser(id))
            dispatch(resetSelectedChat())

        } else if (pathname === '/chat') {
            // 2 case friend chat id and for group id to be selected
            dispatch(setFriendChat(id))
            dispatch(resetSelectedUser())

        }
    }

    useEffect(
        () => {
            const isGroupChat = chat?.isGroupChat

            // user chat
            if (!isGroupChat) {
                setName(chat?.members?.[0]?.name || '')
                setId(chat?.members?.[0]?._id || '')
                setEmail(chat?.members?.[0]?.email || '')
                setAvatar(chat?.members?.[0]?.avatar?.url || '')
                setTotalGroupMembers('')

            } else {
                setName(chat?.name || '')
                setEmail('')
                setId(chat?._id)
                setAvatar(chat?.avatar?.url)
                setTotalGroupMembers(chat?.members?.length)
            }
        }, [chat] // as props
    )

    return (
        <div className='grid gap-2 mt-2 mx-1 cursor-pointer' onClick={() => setUser(id)}>
            <div className='flex bg-[#e7f1ff]  shadow-lg py-4 justify-between px-5 items-center rounded-md '>
                <div className='flex gap-8'>
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            <img src={avatar} />
                        </div>
                    </div>
                    <div>
                        <div className='text-2xl font-semibold'>{name}</div>
                        <div className='text-gray-600 text-xs font-semibold'>{email}</div>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className=' '>45:00:30</div>
                    <div>
                        {
                            totalGroupMembers ? <div className='float-end'>{totalGroupMembers + 1}/50</div> : <div className={`w-3 h-3 rounded-full ${onlineUsers.includes(id) ? "bg-green-700" : "bg-red-700"} float-end `}>
                            </div>
                        }
                    </div>
                </div>

            </div>
            <hr></hr>
        </div>
    )
}

export default Card