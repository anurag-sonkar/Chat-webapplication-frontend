import React from 'react'
import ChatsContainer from '../components/ChatsContainer'
import MessageContainer from '../components/MessageContainer'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='flex'>
            {/* <div className='w-[40%]'><ChatsContainer /></div> 
            <div className='w-[50%]'><MessageContainer /></div> */}
            <Outlet />
        </div>
    )
}

export default Home