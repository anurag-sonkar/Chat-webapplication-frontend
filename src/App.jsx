import React, { lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ChatsContainer from './components/ChatsContainer';
import MessageContainer from './components/MessageContainer';
import Authentication from './pages/Authentication';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routing/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import PublicRoute from './routing/PublicRoute';
const FriendsChats = lazy(
  () => import('./pages/FriendsChats')
)
const Status = lazy(
  () => import('./pages/Status')
)
const GroupChats = lazy(
  () => import('./pages/GroupChats')
)
const FriendRequests = lazy(
  () => import('./pages/FriendRequests')
)
const SearchUsers = lazy(
  () => import('./pages/SearchUsers')
)
const Profile = lazy(
  () => import('./pages/Profile')
)

import { io } from 'socket.io-client'
import { setOnlineUsers } from './features/users/userSlice';
import { getAllNotifications, setNotification } from './features/notifications/notificationSlice';
import { getAllChats } from './features/chats/chatSlice';



function App() {
  const [socket, setSocket] = useState(null)

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (user) {
        const socket = io('http://localhost:8000', {
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
        // socket.on('new-message', (newMessage) => {
        //   dispatch(setNewMessage(newMessage))
        // })
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
          <Route path='status' element={<Status />} />
          <Route path='groups' element={<GroupChats />} />
          <Route path='friend-requests' element={<FriendRequests />} />
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
