import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultChat from './DefaultChat'
import SearchedUserDetail from './SearchedUserDetail'
import Chat from './Chat'
import ManageGroupDetails from './ManageGroupDetails'

function MessageContainer() {
  const { user } = useSelector(state => state.auth)
  const { searchedSelectedUser } = useSelector(state => state.user)
  const { selectedChat } = useSelector(state => state.chat)
  const { selectedGroup } = useSelector(state => state.group)



  return (
    <div className='bg-blue-50 w-[60%] h-[100vh] grid place-items-center'>
      {/* if no user selected then show */}
      {
        user &&
        <div className='flex flex-col justify-center items-center gap-12'>
          {
            searchedSelectedUser === null && selectedChat === null && selectedGroup === null && <DefaultChat />
          }


          {
              searchedSelectedUser !== null && selectedChat == null && selectedGroup === null &&
            <SearchedUserDetail />
          }

        </div>
      }
          {
        selectedChat !== null && searchedSelectedUser === null && selectedGroup === null &&<Chat />
          }

          {
        selectedGroup !== null && searchedSelectedUser === null && selectedChat === null && <ManageGroupDetails />
          }


    </div>
  )
}

export default MessageContainer