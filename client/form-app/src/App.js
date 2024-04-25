import React from 'react';
import './App.css';
import UserForm from './Components/UserForm'
import UserList from './Components/UserList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UserUpdate from './Components/UserUpdate';
import NavBar from './Components/NavBar.';

function App() {

  


  return (
 
<div>
<div className='App'>
 
<NavBar/>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 p-4">
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userupdate/:id" element={<UserUpdate />} />
        </Routes>
      </div>
    </div>
  </div>
</div>

</div>



);
}

export default App;
