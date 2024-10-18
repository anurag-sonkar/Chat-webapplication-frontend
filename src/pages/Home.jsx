import React from 'react'
import ChatsContainer from '../components/ChatsContainer'
import MessageContainer from '../components/MessageContainer'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='flex'>
            <Outlet />
        </div>
    )
}

export default Home