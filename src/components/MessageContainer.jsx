import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

function MessageContainer() {
  const [user , setUser] = useState(false) // temp

  return (
    <div className='bg-blue-50 w-[60%] h-[100vh] grid place-items-center'>
      {/* if no user selected then show */}
      {
        !user && <div className='flex flex-col justify-center items-center gap-12'>
          <img src='https://avatar.iran.liara.run/public/4' className='w-[15rem] h-auto object-cover shadow-lg shadow-blue-400 rounded-full' />
        <div className='grid place-items-center gap-2'>
            <div className='text-5xl'>Hi! <span className='font-semibold '>Anurag</span> </div>
            <div>Download for Android</div>
            <p>get a faster experience when you download the android app</p>
            <button className="btn btn-active btn-ghost w-full">Get from Android Store</button>
        </div>
        </div>
      }
    </div>
  )
}

export default MessageContainer