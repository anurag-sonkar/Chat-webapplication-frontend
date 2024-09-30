import React, { lazy, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ChatsContainer from './components/ChatsContainer';
import MessageContainer from './components/MessageContainer';
import Authentication from './pages/Authentication';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routing/ProtectedRoute';
import { useSelector } from 'react-redux';
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


function App() {
  const {user} = useSelector(state => state.auth)
  
  return (
    <div className='flex'>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
      
        <Route path='/' element={<PublicRoute><Authentication /></PublicRoute>} />

        {/* Left side - ChatsContainer */}
        <Route path='chat' element={<ProtectedRoute><ChatsContainer/></ProtectedRoute>}>
          <Route index element={<FriendsChats/>} />
          <Route path='status' element={<Status/>} />
          <Route path='groups' element={<GroupChats/>} />
          <Route path='friend-requests' element={<FriendRequests/>} />
          <Route path='search-users' element={<SearchUsers/>} />
          <Route path='profile' element={<Profile/>} />
        </Route>


      </Routes>
      {/* Right side - MessageContainer */}
      {user && <MessageContainer></MessageContainer>}
    </div>
  );
}

export default App;
