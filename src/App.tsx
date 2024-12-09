import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/landing-page.tsx';
import Threads from './pages/threads.tsx';
import SignIn from './pages/sign-in.tsx';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/threads" element={<Threads />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  )
    
}

