import * as React from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import { isVerified } from '../utils/isVerified.ts';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/common/side-bar.tsx';

export default function Profile() {
    const name = localStorage.getItem("userName");
    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();
    if (!isVerified()) navigate("./signin");
    return (
    <div className=''>
        <NavBar/>
        <div className='flex flex-row min-h-screen justify-center items-center'>
            <div className='flex content-center flex-col h-full w-fullrounded-md p-10 bg-gradient-to-bl from-blue-50 to-red-50 rounded-xl duration-100'>
                <div className='text-3xl font-bold '>{name}</div>
                <div className='text-sm text-gray-400'>{userID}</div>
                <button onClick={() => {localStorage.removeItem("userID");localStorage.removeItem("userName")}}
                className='text-center w-fit bg-black text-white font-bold px-5 mt-5 rounded-full'>
                 Log out
                </button>
            </div>
            
        </div>
        
        
    </div>
    )
}