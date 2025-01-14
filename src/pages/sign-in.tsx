import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/auth/authApiSlice.ts';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/auth/authSlice.ts';


export default function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setMessage("")
    }, [username, password])

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const name = username
            if (name === '') {
                setMessage('Missing Username');
                return;
            }
            const userData = await login({name, password}).unwrap()
            dispatch(setCredentials({...userData.payload}));
            setUsername('');
            setPassword('');
            navigate("/threads")
        } catch (error) {
            if (!error?.response) {
                setMessage("Cannot connect to server");
            } else if (error.response?.status === 400) {
                setMessage("Invalid request");
            } else if (error.response?.status === 401) {
                setMessage("Unauthorized");
            } else {
                setMessage("Login Failed");
            }
        }
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-16 lg:px-48 gap-2">
            <NavBar/>
            <div className='text-3xl'>Sign in</div>
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} className='block p-2.5 w-2/3 lg:w-1/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Username'>
            </input>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='block p-2.5 w-2/3 lg:w-1/3 text-sm text-gray-700 bg-gray-50 rounded-lg border ' placeholder='Password (Optional)'>
            </input>
            <div className='text-red-500'>{message}</div>
            <div className='text-gray-600'>Haven't registered? You can registered <a className="font-bold" href="/register">here</a>.</div>
            <button className='bg-black px-10 text-white py-2 rounded-xl' onClick={handleSignIn}>SUBMIT</button>
        </div>
    );
}
