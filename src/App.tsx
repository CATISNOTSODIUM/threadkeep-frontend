import React from 'react';
import './index.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/landing-page.tsx';
import Threads from './pages/threads.tsx';
import ThreadDisplay from './pages/thread-display.tsx';
import SignIn from './pages/sign-in.tsx';
import Profile from './pages/profile.tsx';
import Register from './pages/register.tsx';
import RequireAuth from './components/authentication/require-auth.tsx';


export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Outlet />}> 
        <Route index element={<Home/>}></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path="/threads" element={<Threads />} />
          <Route path="/thread-display" element={<ThreadDisplay />} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Route>
    </Routes>
  )
    
}

