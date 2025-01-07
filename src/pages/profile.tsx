import * as React from 'react';
import NavBar from '../components/common/nav-bar.tsx';
import { isVerified } from '../utils/isVerified.ts';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/common/side-bar.tsx';

export default function Profile() {
    const navigate = useNavigate();
    if (!isVerified()) {
        return (<div className=''>
            <NavBar/>
            <div className='flex flex-col justify-center items-center h-full overflow-hidden my-24'>
                <div>You haven't sign in. </div>
                <button 
                    className="border-black rounded-full border-2 text-xl px-10 py-2 my-2 min-w-56 h-fit"
                    onClick={() => navigate("/signin")}
                >
                Sign in / Register
                </button>
            </div>
        </div>)
    }
    return (
    <div className=''>
        <NavBar/>
        <div className='flex flex-row justify-normal min-h-screen items-start my-24'>
            <SideBar spanPage={true}/>
        </div>
    </div>
    )
}