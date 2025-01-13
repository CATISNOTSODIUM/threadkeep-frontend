import React, { useState } from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import { createUser } from '../api/users.ts';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const handleRegister = async () => {
        setMessage('')
        const userRequest = await createUser(username, password);
        if (userRequest.error) {
            setMessage(userRequest.error);
            return;
        }
        navigate("/signin")
    }
    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-48 gap-2">
            <NavBar/>
            <div className='text-3xl'>Register</div>
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} className='block p-2.5 w-1/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Username'>
            </input>
            <input id="password" value={password} onChange={e => setPassword(e.target.value)} className='block p-2.5 w-1/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Password (Optional)'>
            </input>
            <div className='text-red-500'>{message}</div>

            <button className='bg-black px-10 text-white py-2 rounded-xl' onClick={handleRegister}>SUBMIT</button>
        </div>
    );
}