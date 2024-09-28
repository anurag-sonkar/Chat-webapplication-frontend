import React, { lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatsContainer from './components/ChatsContainer';
import MessageContainer from './components/MessageContainer';
import Authentication from './pages/Authentication';

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
  const [user , setUser] = useState(false)
  return (
    <div className='flex'>
      <Routes>
        <Route path='/' element={<Authentication />} />

        {/* Left side - ChatsContainer */}
        <Route path='chat' element={<ChatsContainer/>}>
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
