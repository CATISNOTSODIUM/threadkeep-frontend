import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from '../components/common/nav-bar.tsx';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-bl from-blue-50 to-red-50 flex flex-col min-h-screen justify-center px-16 lg:px-64">
            
            <NavBar/>
            <div className="text-3xl font-semibold">Welcome to </div>
            <div className='text-6xl font-bold my-5'>TAGGY</div>
            <div className='text-2xl'>A hub for insightful discussions and streamlined data retrieval system.</div>
            <div className="text-xl my-3">Get a chance to collaborate with other people </div>

            {!localStorage.getItem('userID') ?
            
                <button 
                    className="border-black rounded-full border-2 text-xl px-10 py-2 my-2 min-w-56"
                    onClick={() => navigate("signin")}
                >
                Sign in / Register
                </button>
                :
                 <button 
                className="bg-black rounded-full text-white text-xl px-10 py-2 my-2 max-w-56"
                onClick={() => navigate("threads")}
                >
                    Let's tag!
                </button>
            }
            
        </div>
    );
}