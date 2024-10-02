import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendFriendRequest } from "../features/users/userSlice"
function SearchedUserDetail() {
  const dispatch = useDispatch()
    const { searchedSelectedUser } = useSelector(state => state.user)
    const handleSendFriendRequest = () => {
        dispatch(sendFriendRequest(searchedSelectedUser._id))
    }
  return (
    <>
          <div className='grid place-items-center gap-2'>
              <img src={searchedSelectedUser?.avatar?.url} className='w-[15rem] h-[15rem] object-cover shadow-lg shadow-blue-400 rounded-full' />
              <div className='w-4 h-4 rounded-full bg-green-700 absolute right-[12%] bottom-[12%] animate-ping'></div>
          </div>  <div className='grid place-items-center gap-2'>
              <div className='text-5xl font-semibold'>{searchedSelectedUser?.name}</div>
              <div className='font-semibold text-gray-700'>{searchedSelectedUser?.email}</div>
              <button className="btn btn-success w-full text-xl" onClick={handleSendFriendRequest}>Send Request</button>

          </div>
    </>
  )
}

export default SearchedUserDetail