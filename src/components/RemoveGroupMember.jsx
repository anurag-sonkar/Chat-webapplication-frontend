import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeGroupMember } from '../features/groups/groupSlice'
import Loader from './Loader'
import Loading from './Loading'

function RemoveGroupMember() {
    const { selectedGroup, isLoading } = useSelector(state => state.group)
    const dispatch = useDispatch()

    const handleRemoveGroupMember = async(id)=>{
        dispatch(removeGroupMember({
            "chatId" : selectedGroup?._id,
            "userId" : id
        }))

    }
  return (
          <div className='w-full h-full py-9 flex flex-col items-center gap-3 overflow-y-auto custom-scrollbar relative'>
              {
                  selectedGroup?.members?.map((member, index) => <div className='flex items-center justify-between min-w-96 bg-gray-200 gap-3 px-4 py-4 rounded-md'>
                      <div className='flex items-center gap-4'>
                          {/* avatar */}
                          <div className="avatar">
                              <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                                  <img src={member?.avatar?.url} alt='user-avatar' />
                              </div>
                          </div>
                          {/* name */}
                          <div className='text-xl font-semibold'>{member?.name}</div>
                      </div>
                      {/* remove btn */}
                      <button className="btn btn-error btn-sm" onClick={()=>handleRemoveGroupMember(member?._id)} disabled={isLoading}>Remove</button>
                  </div>)
              }
            
            {
              isLoading && <Loading />
            }

          </div>
  )
}

export default RemoveGroupMember