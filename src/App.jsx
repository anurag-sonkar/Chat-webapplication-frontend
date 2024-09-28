import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChatsContainer from './components/ChatsContainer';
import FriendsChats from './pages/FriendsChats';
import Status from './pages/Status';
import GroupChats from './pages/GroupChats';
import FriendRequests from './pages/FriendRequests';
import SearchUsers from './pages/SearchUsers';
import MessageContainer from './components/MessageContainer';
import TestMessage from './components/TestMessage';
import Profile from './components/Profile';

function App() {
  return (
    <div className='flex'>
      <Routes>
        {/* Left side - ChatsContainer */}
        <Route path='chat' Component={ChatsContainer}>
          <Route index Component={FriendsChats} />
          <Route path='status' Component={Status} />
          <Route path='groups' Component={GroupChats} />
          <Route path='friend-requests' Component={FriendRequests} />
          <Route path='search-users' Component={SearchUsers} />
          <Route path='profile' Component={Profile} />
        </Route>


      </Routes>
      {/* Right side - MessageContainer */}
      <MessageContainer></MessageContainer>
    </div>
  );
}

export default App;
