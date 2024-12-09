import React from 'react';

export default function Threads() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-10">
      <div className="text-3xl font-semibold my-5">Welcome to </div>
      <div className='text-6xl font-bold'>THREADS</div>
      <div className="text-xl my-3 text-center">Get a chance to collaborate with other people </div>
      <button className="bg-black rounded-full text-white text-xl px-10 py-2 my-2 min-w-56">Let's tag!</button>
      <button className="border-black rounded-full border-2 text-xl px-10 py-2 my-2 min-w-56">Sign in / Register</button>
    </div>
  );
}

