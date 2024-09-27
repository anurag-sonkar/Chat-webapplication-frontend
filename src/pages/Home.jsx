import React from 'react'
import ChatsContainer from '../components/ChatsContainer'
import MessageContainer from '../components/MessageContainer'

function Home() {
    return (
        <div className='flex'>
            <div className='w-[40%]'><ChatsContainer /></div> {/* left Container with sidebar and its selected option */}
            <div className='w-[60%]'><MessageContainer /></div> {/* detailed message container */}
        </div>
    )
}

export default Home