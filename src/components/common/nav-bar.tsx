import * as React from 'react';
import { useNavigate } from 'react-router-dom';


// FIX: Add hamburger dropdown menu
// TODO: ADD SEARCH BAR
export default function NavBar() {
   const navigate = useNavigate();
  const tabs = ["Home", "Threads", "Profile"]
  const url = ["/", "/threads","/profile"]
  return (


<nav className="bg-white/60 fixed w-full z-20 top-0 start-0 border-b border-gray-100">

  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <button onClick={() => navigate("/")} className="flex items-center">
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">⬢ TAGGY</span>
    </button>
    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
      <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
        {tabs.map((tab, index) => {
          return (
            <li>
            <button onClick={() => navigate(url[index])} className="block py-2 px-3 rounded bg-transparent" aria-current="page">
              {tab}
            </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
</nav>

  )
}
