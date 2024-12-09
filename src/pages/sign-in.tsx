import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/common/nav-bar.tsx';


export default function SignIn() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen justify-center items-center px-10">
            <NavBar/>
            <div className='text-6xl font-bold'>SIGN IN</div>
        </div>
    );
}