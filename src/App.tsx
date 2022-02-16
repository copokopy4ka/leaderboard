import React from 'react';
import UserList from './components/UserList/UserList';
import UserListHeader from './components/UserListHeader/UserListHeader';

function App() {
  return (
    <div className="App">
        <UserListHeader/>
        <UserList/>
    </div>
  );
}

export default App;
