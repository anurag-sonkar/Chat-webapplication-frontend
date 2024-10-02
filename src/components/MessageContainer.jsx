import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultChat from './DefaultChat'
import SearchedUserDetail from './SearchedUserDetail'
import Chat from './Chat'

function MessageContainer() {
  const { user } = useSelector(state => state.auth)
  const { searchedSelectedUser } = useSelector(state => state.user)
  const { selectedChat } = useSelector(state => state.chat)



  return (
    <div className='bg-blue-50 w-[60%] h-[100vh] grid place-items-center'>
      {/* if no user selected then show */}
      {
        user &&
        <div className='flex flex-col justify-center items-center gap-12'>
          {
            searchedSelectedUser === null && selectedChat === null && <DefaultChat />
          }


          {
            searchedSelectedUser !== null && selectedChat == null &&
            <SearchedUserDetail />
          }

        </div>
      }
          {
            selectedChat !== null && searchedSelectedUser === null && <Chat />
          }


    </div>
  )
}

export default MessageContainer