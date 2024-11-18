import React from 'react'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        <div className='flex'>
            <Outlet />
        </div>
    )
}

export default Home