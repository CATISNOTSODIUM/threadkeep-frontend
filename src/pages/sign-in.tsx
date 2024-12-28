import React, { useState } from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import { verifyUser } from '../api/users.ts';


export default function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const handleSignIn = async () => {
        setMessage('')
        const res = await verifyUser(username, password);
        if (res == false) {
            setMessage("Invalid request. Invalid username or password")
        } else {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("userName", res.name);
            localStorage.setItem("userID", res.id);
        }
    }
    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-16 lg:px-48 gap-2">
            <NavBar/>
            <div className='text-3xl'>Sign in</div>
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} className='block p-2.5 w-2/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Username'>
            </input>
            <input id="password" value={password} onChange={e => setPassword(e.target.value)} className='block p-2.5 w-2/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Password (Optional)'>
            </input>
            <div className='text-red-500'>{message}</div>
            <div className='text-gray-600'>Haven't registered? You can registered <a className="font-bold" href="/register">here</a>.</div>
            <button className='bg-black px-10 text-white py-2 rounded-xl' onClick={handleSignIn}>SUBMIT</button>
        </div>
    );
}