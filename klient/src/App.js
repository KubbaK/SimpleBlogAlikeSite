import './App.css';
import Main from './components/Main/Main.jsx'
import Login from './components/Login/Login.jsx'
import AddPost from './components/DodajPost/AddPost.jsx'
import Signup from './components/Rejestracja/Signup.jsx'
import Szczegóły from './components/WidokSzczegółowy/Szczegóły.jsx'
import Wszystko from './components/PokażWszystko/Wszystko.jsx'
import EditPost from './components/EdytujPost/EditPost';
import React from 'react';
import {Route,Routes,Navigate} from "react-router-dom"



function App() {
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />} 
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/szczegoly/:id" exact element={<Szczegóły/>}/>
      <Route path="/login" exact element={<Login />} />
      <Route path="/addpost" exact element={<AddPost />}/>
      <Route path="/all" exact element={<Wszystko/>}/>
      <Route path="/editPost/:id" exact element={<EditPost/>}/>
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
    
  );
}

export default App;
