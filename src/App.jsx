import React, { lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ChatsContainer from './components/ChatsContainer';
import MessageContainer from './components/MessageContainer';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routing/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import PublicRoute from './routing/PublicRoute';

// import Authentication from './pages/Authentication';
// const FriendsChats = lazy(
//   () => import('./pages/FriendsChats')
// )
import FriendsChats from './pages/FriendsChats';
const Authentication = lazy(
  () => import('./pages/Authentication')
)

// const Status = lazy(
//   () => import('./pages/Status')
// )
const GroupsChats = lazy(
  () => import('./pages/GroupsChats')
)
// const FriendRequests = lazy(
//   () => import('./pages/FriendRequests')
// )
const SearchUsers = lazy(
  () => import('./pages/SearchUsers')
)
const Profile = lazy(
  () => import('./pages/Profile')
)
const CreateNewGroup = lazy(
  () => import("./pages/CreateNewGroup")
)

const ManageGroups = lazy(
  () => import('./pages/ManageGroups')
)

import { io } from 'socket.io-client'
import { setOnlineUsers } from './features/users/userSlice';
import { getAllNotifications, setNotification } from './features/notifications/notificationSlice';
import { getAllChats } from './features/chats/chatSlice';
import { setNewMessage } from './features/messages/messageSlice';
import { user_base_url } from './utils/base_url';



function App() {
  const [socket, setSocket] = useState(null)

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (user) {
        const socket = io(`${user_base_url}`, {
          query: {
            userId: user?._id
          }
        })
        // dispatch(setSocket(socket))
        setSocket(socket)
        socket.on('onlineUsers', (onlineUsers) => {
          dispatch(setOnlineUsers(onlineUsers))
        })


        // new frined request notification
        socket.on('notification', (data) => {
          console.log(data)
          dispatch(setNotification(data))
        })


        // accept request - chat refetch  
        socket.on('refetch-chat', (data) => {
          console.log(data)
          dispatch(getAllChats())
          dispatch(getAllNotifications())
        })

        // on new group added
        socket.on('group-chat', (data) => {
          console.log(data)
          dispatch(getAllChats())
          // dispatch(getAllNotifications())
        })

        // new- message
        socket.on('new-message', (newMessage) => {
          dispatch(setNewMessage(newMessage))
        })
        return () => socket.close()
      }

    }, [user]
  )

  return (
    <div className='flex'>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        <Route path='/' element={<PublicRoute><Authentication /></PublicRoute>} />

        {/* Left side - ChatsContainer */}
        <Route path='chat' element={<ProtectedRoute><ChatsContainer /></ProtectedRoute>}>
          <Route index element={<FriendsChats />} />
          {/* <Route path='status' element={<Status />} /> */}
          <Route path='create-new-group' element={<CreateNewGroup />} />
          <Route path='groups' element={<GroupsChats />} />
          {/* <Route path='friend-requests' element={<FriendRequests />} /> */}
          <Route path='manage-groups' element={<ManageGroups />} />
          <Route path='search-users' element={<SearchUsers />} />
          <Route path='profile' element={<Profile />} />
        </Route>


      </Routes>
      {/* Right side - MessageContainer */}
      {user && <MessageContainer></MessageContainer>}
    </div>
  );
}

export default App;
