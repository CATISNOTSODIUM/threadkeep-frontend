import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/landing-page';
import Threads from './pages/threads';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/threads" element={<Threads />} />
    </Routes>
  )
    
}

