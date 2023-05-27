import React from 'react';
import './App.css';
import { Dial, Login, Register } from './Components';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dial' element={<Dial />}></Route>
        </Routes>
      </Router>


      {/* <Register/> */}
      {/* <Login /> */}
      {/* <Dial/> */}
    </div>
  );
}

export default App;
