import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendFriendRequest, setSelectedUser } from '../features/users/userSlice'

function MessageContainer() {
  const { user } = useSelector(state => state.auth)
  const { searchedSelectedUser } = useSelector(state => state.user)
  const { avatar, name } = user
  const dispatch = useDispatch()
  
  const handleSendFriendRequest = ()=>{
    dispatch(sendFriendRequest(searchedSelectedUser._id)) 
  }

  return (
    <div className='bg-blue-50 w-[60%] h-[100vh] grid place-items-center'>
      {/* if no user selected then show */}
      {
        user && <div className='flex flex-col justify-center items-center gap-12'>
          <div className='relative'>
            <img src={searchedSelectedUser === null ? avatar?.url : searchedSelectedUser.avatar.url} className='w-[15rem] h-[15rem] object-cover shadow-lg shadow-blue-400 rounded-full' />
            <div className='w-4 h-4 rounded-full bg-green-700 absolute right-[12%] bottom-[12%] animate-ping'></div>
          </div>


          {
            searchedSelectedUser === null ? <div className='grid place-items-center gap-2'>
              <div className='text-5xl'>Hi! <span className='font-semibold '>{name}</span> </div>
              <div>Download for Android</div>
              <p>get a faster experience when you download the android app</p>
              <button className="btn btn-active btn-ghost w-full">Get from Android Store</button>
            </div> : <div className='grid place-items-center gap-2'>
              <div className='text-5xl font-semibold'>{searchedSelectedUser?.name}</div>
              <div className='font-semibold text-gray-700'>{searchedSelectedUser?.email}</div>
                <button className="btn btn-success w-full text-xl" onClick={handleSendFriendRequest}>Send Request</button>

            </div>
          }
        </div>
      }


    </div>
  )
}

export default MessageContainer