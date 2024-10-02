import React from 'react'
import { useSelector } from 'react-redux'

function DefaultChat() {
    const { user } = useSelector(state => state.auth)


  return (
      <div className='relative grid place-items-center gap-12'>
          <img src={user?.avatar?.url} className='w-[15rem] h-[15rem] object-cover shadow-lg shadow-blue-400 rounded-full' />
          <div className='w-4 h-4 rounded-full bg-green-700 absolute right-[12%] bottom-[12%] animate-ping'></div>
          <div className='grid place-items-center gap-2'>
              <div className='text-5xl'>Hi! <span className='font-semibold '>{user?.name}</span> </div>
              <div>Download for Android</div>
              <p>get a faster experience when you download the android app</p>
              <button className="btn btn-active btn-ghost w-full">Get from Android Store</button>
          </div>
      </div>
  )
}

export default DefaultChat