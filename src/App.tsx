import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Main } from './pages/main/main';
import { Login } from './pages/login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />}> Home </Route>
          <Route path='/login' element={<Login />}> Login </Route>
          <Route path='/createpost' element={<CreatePost />}> Create Post</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
